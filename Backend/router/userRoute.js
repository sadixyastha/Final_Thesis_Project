const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const sendEmail = require('../utils/sendEmail');
const auth = require("../auth/auth.js");
const upload = require("../uploads/userFile");

const router = new express.Router();

router.post('/signup', async(req,res)=>{
    const email = req.body.email;
    if(!validator.isEmail(email)) {
        return res.status(400).json({message: "Provide a valid email address."});
    }
    const user = await User.findOne({
        email: email
    })
    if(user) return res.status(400).send({message: 'User already registered with given email.'})
    const password = req.body.password;
    bcryptjs.hash(password, 10, async(e, hashed_value)=>{
    const newUser = new User({
        email: email,
        password: hashed_value,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone_no: req.body.phone_no,
        gender: req.body.gender,
        profile_pic : "profilePic.png"
    })

    newUser.save();
    const OTP = otpGenerator.generate(6, {
        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars:false
    });
    console.log(OTP);
    
    const otp = new Otp({email: email, otp: OTP});
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    sendEmail(email, "User Verification OTP Token", OTP);
    return res.status(200).send({success:true, message:"Otp send successfully!"});
        
    }
    )
});


router.post('/user/verify', async(req,res)=>{
    const email = req.body.email;
    const otpHolder = await Otp.find({
        email: req.body.email
    });
   
    if (otpHolder.length === 0) return res.status(400).send("You used an Expired OTP!!");
    const rightOtpFind = otpHolder[otpHolder.length-1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if(rightOtpFind.email === req.body.email && validUser) {
        const user = await User.updateOne({email: req.body.email},{verified: true});
        const token =generateJWT(user._id,user.email);
        const OTPDelete = await Otp.deleteMany({
            email: rightOtpFind.email
        });

        return res.status(200).send({
            message: "User Registration Successful!!",
            token: token,
            data: user,
        });
    }
    else{
        return res.status(400).send({message: "Your OTP was wrong!"})
    }
})

router.post("/user/login", (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then((userData)=> {
        if(userData==null) {
            if(!validator.isEmail(email)) {
                return res.status(400).send({message: "User with that email does not exist or provide a valid email address."});
            } 
            User.findOne({email: email}).then((userData1)=> {
                if(userData1===null) {
                    return res.status(400).send({message: "User with that email address does not exist."});
                } 
                // Now comparing client password with the given password
                bcryptjs.compare(password, userData1.password, function(e, result){
                    if(!result) {
                        res.status(400).send({message: "Incorrect password, try again."});
                    }
                    else {                        
                        // Now lets generate token
                        const token = jwt.sign({userId: userData1._id}, "loginKey");
                        if (userData1.admin==false) {
                            res.status(200).send({token: token, message: "Login success", userData: userData1});                              
                        }  
                        else if(userData1.verified===false){
                            return res.status(400).send({message:"Verification required first."})
                        }
                        else if(userData1.admin) {
                            res.status(200).send({token: token, message: "Login success as admin.", userData: userData1});  
                        }
                    }          
                }); 
            });
        }
        else {            
            // Now comparing client password with the given password
            bcryptjs.compare(password, userData.password, function(e, result){
                if(!result) {
                    return res.status(400).send({message: "Incorrect password, try again."});
                }
                // Now lets generate token
                const token = jwt.sign({userId: userData._id}, "loginKey");
                if (userData.admin==false){
                    res.status(200).send({token: token, message: "Login success", userData: userData});                              
                }
                else if(userData.admin) {
                    res.status(200).send({token: token, message: "Login success as admin.", userData: userData});  
                } 
            });
        }
    });
});

router.get("/profile", auth.verifyUser, async(req,res)=>{
    // res.json({msg : req.userInfo.phone_no});
    const user = await User.findOne({_id : req.userInfo._id});
    res.json(user);
})

router.put("/user/update", auth.verifyUser, function(req,res){
    const uid = req.userInfo._id;
    const {
        firstName,
        lastName,
        bio,
        gender,
        address,
        phone_no
    } = req.body
    
    const updatedProfile = {
        firstName,
        lastName,
        bio,
        gender,
        address,
        phone_no
    }
    User.updateOne({_id : uid},updatedProfile)
    .then(function(){
        res.json({success:true, msg: "Profile updated!"})
    })
    .catch(function(e){
        res.json({msg: e})
    });
})

router.put("/update/profilePic", auth.verifyUser, upload.single("profilePic"), function(req, res){
    const uid = req.userInfo._id;
    if(req.file===undefined){
        return res.json({msg: "Invaliddd!!"})
    }
    User.findOne({_id: uid})
    .then(function(userData){
        if(userData.profile_pic!=="profilePic.png"){
            fs.unlinkSync("./images/user/"+userData.profile_pic)
        }
        User.updateOne({_id: uid},{
            profile_pic : req.file.filename
        })
        .then(function(){
            res.json({msg: "Profile picture added successfully!"})
        })
        .catch(function(e){
            res.json({msg: e})
        })
    })
   
})

const generateJWT = (id,email) => {
    return jwt.sign({
        _id: this._id,
        email: this.email,
    }, "RegisterUserKey", { expiresIn: "5m" });
}

module.exports = router;