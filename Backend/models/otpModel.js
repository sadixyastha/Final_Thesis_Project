const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
        required: true
    },
    user_id : {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    createdAt: {type: Date, default: Date.now, index: { expires: 300 }}
}, 
{
    timestamps: true
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;