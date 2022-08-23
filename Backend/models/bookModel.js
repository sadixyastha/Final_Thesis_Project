const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId, ref : "User"
    },
    bookImage: {
        type: String,
        default: "",
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookPrice: {
        type: String,
        required: true
       
    },
    bookDescription: {
        type: String,
        required: true
    },
   
    bargain: {
        type: String,
        required: true
    },
    bookCategory: {
        type: String,
        required: true
    },
    category_id : {
        type : mongoose.Types.ObjectId, ref : "Category"
    },
  
},
{
    timestamps: true,
});

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;

