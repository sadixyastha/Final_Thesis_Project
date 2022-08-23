const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./database/database");

const UserRoute = require("./router/userRoute");
app.use(UserRoute);

const CategoryRoute = require("./router/categoryRoute");
app.use(CategoryRoute);

const BookRoute = require("./router/bookRoute");
app.use(BookRoute);



app.use(express.static(__dirname+'/images/'));

app.listen(4001);
module.exports = app;