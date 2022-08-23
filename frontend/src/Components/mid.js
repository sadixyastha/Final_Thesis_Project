import React from "react";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AddCategory from "./admin/addCategory";
import ShowCategory from "./admin/viewCategory";

import AddBook from "./user/addBook";
import Books from "./user/book";
import CategoryBook from "./user/categoryBook";
import Home from "./user/home";
import Login from "./user/login";
import OtpPage from "./user/otpPage";
import Register from "./user/register";
import ViewBook from "./user/viewBook";
import ViewBookDetail from "./user/viewBookDetail";


class Mid extends Component{
    render(){
        return(
            <div>
                <Routes>
                    <Route path = "/" element={<Home></Home>}></Route>
                    <Route path = "/register" element={<Register></Register>}></Route>
                    <Route path = "/otpPage" element = {<OtpPage></OtpPage>}></Route>
                    <Route path = "/login" element ={<Login></Login>}></Route>
                    <Route path = "/addBook" element = {<AddBook></AddBook>}></Route>
                    <Route path = "/viewBook" element = {<ViewBook></ViewBook>}></Route>
                    <Route path = "/books" element = {<Books></Books>}></Route>
                    <Route path = "/addCategory" element = {<AddCategory></AddCategory>}></Route>
                    <Route path = "/viewCategory" element = {<ShowCategory></ShowCategory>}></Route>
                    <Route path = "/categoryBook" element = {<CategoryBook></CategoryBook>}></Route>
                    <Route path = "/viewDetail/:bid" element = {<ViewBookDetail></ViewBookDetail>}></Route>
                </Routes>
            </div>
        )
    }
}
export default Mid;