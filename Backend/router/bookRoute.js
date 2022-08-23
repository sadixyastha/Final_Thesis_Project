const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth.js");
const upload = require("../uploads/bookFile")
const Books = require("../models/bookModel");
const { fstat } = require("fs");

router.post("/add/books", auth.verifyUser, upload.single('bookImage'), async(req,res)=>{
    if(req.file===undefined){
        return res.status(400).json({message : "Invalid Image Type!!"})
    }
    const bookImage = req.file.filename;
    const bookName = req.body.bookName;
    const bookPrice = req.body.bookPrice;
    const bookDescription = req.body.bookDescription;
    const bargain = req.body.bargain;
    const bookCategory = req.body.bookCategory;
    
    const bookData = new Books({
        bookImage: bookImage,
        bookName: bookName,
        bookPrice: bookPrice,
        bookDescription: bookDescription,
        bargain: bargain,
        bookCategory: bookCategory,
        user_id : req.userInfo._id,
    })
    bookData.save()
    .then(function(){
        res.status(200).send({success: true,data:bookData, message: "New book added successfully!"});
    }).catch(function(e){
        res.status(400).send({message: "Empty field found. Fill up the form completely!!"});
    })
})

router.put("/update/books/:bid", auth.verifyUser, upload.single("bookImage"), async(req,res)=>{
    const bid = req.params.bid;

    const bookName = req.body.bookName;
    const bookPrice = req.body.bookPrice;
    const bookDescription = req.body.bookDescription;
    const bargain = req.body.bargain;
    const bookCategory = req.body.bookCategory;
   

    Books.findOne({_id: bid})
    .then((bookData)=>{

        Books.updateOne({_id:bid}, {
            bookName: bookName,
            bookPrice: bookPrice,
            bookDescription: bookDescription,
            bargain: bargain,
            bookCategory: bookCategory,
         
        })
        .then(function(){
            res.status(200).send({success:true, message: "Book details has been updated!"})
        })
        .catch(function(){
            res.status(400).send({message: e})
        });
    })
    .catch((e)=>{
        res.status(400).send({message:e });
    })
})

router.put("/update/book/image/:bid", auth.verifyUser, upload.single("bookImage"), async(req,res)=>{
    const bid = req.params.bid;

    if(req.file === undefined){
        return res.json({message: "Invalid!!"})
    }

    const bookImage = req.file.filename;

    Books.findOne({_id: bid})
    .then((bookData)=>{
        if(!bookData.bookImage){
            const book_image_path = `./uploads/book/${bookData.bookImage}`;
            fs.unlinkSync(book_image_path);
        }

        Books.updateOne({_id: bid}, {
            bookImage: bookImage
        })
        .then(function(){
            res.status(200).send({success: true, message: "Book Image Updated!"});
        })
        .catch(function(){
            res.status(400).send({message: e});
        });
    })
    .catch((e)=>{
        res.status(400).send({message: e});
    })
})


router.get('/books/all', auth.verifyUser, async(req,res)=>{
    const BookData = await Books.find()
    res.json({success: true, message:"Books Data", data:BookData});
})

router.get("/books/single/:bid", auth.verifyUser, function(req,res){
    const bid = req.params.bid;
    Books.findOne({_id : bid})
    .then(function(result){
        res.status(200).send({success:true, data:result, message: "Book details by Id"})
    })
    .catch(function(){
        res.status(400).send({message: "Something went wrong!"})
    })
})

router.get("/books/category/:category", auth.verifyUser, function(req,res){
    const _category = req.params.category;
    Books.find({bookCategory : _category})
    .then(function(result){
        res.status(200).send({success:true, data:result, message: "Books by category"})

    })
    .catch(function(){
        res.status(400).send({message: "Something went wrong!"})
    })
})

router.get('/book/all', async(req,res)=>{
    const BookData = await Books.find()
    res.json({success: true, message:"Books Data", data:BookData});
})

router.get('/book/limit', async(req,res)=>{
    const BookData = await Books.find().limit(3)
    res.json({success: true, message:"Books Data", data:BookData});
})
router.get("/books/single/view/:bid", auth.verifyUser, async(req,res)=>{
    const bid = req.params.bid;
    Books.findOne({_id : bid})
    .populate("user_id", "firstName lastName phone_id")
    .then(function(result){
        res.status(200).send({success:true, data:result, message: "Book details by Id"})
    })
    .catch(function(){
        res.status(400).send({message: "Something went wrong!"})
    })
})

router.get("/books/:category", auth.verifyUser, function(req,res){
    const _category = req.params.category;
    Books.find({bookCategory : _category})
    .then(function(result){
        res.status(200).send({success:true, data:result, message: "Books by category"})
    })
    .catch(function(){
        res.status(400).send({message: "Something went wrong!"})
    })
})

router.delete("/books/delete/:bid", auth.verifyUser, function(req,res){
    const bid = req.params.bid;
    Books.deleteOne({_id : bid})
    .then(function(){
        res.status(200).send({success:true, message: "Book has been deleted!"});
    })
    .catch(function(){
        res.status(400).send({message: "Something went wrong!"});
    })

})

router.post("/search/book", async(req, res)=>{
    
    const keyMealName = req.body.bookName

    ? {bookName: { $regex: req.body.bookName, $options: "i" }}

    :{};
    const books = await Books.find(keyMealName)
    res.send(books);
})

module.exports = router;