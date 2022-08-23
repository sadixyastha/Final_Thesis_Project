const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Second_Hand_BookStore', {
    useNewUrlParser: true,
    useUnifiedTopology : true
})
// .then(()=> console.log("Connected to MongoDB!!"))
// .catch((err) => console.log("MongoDB Connection Failed"));