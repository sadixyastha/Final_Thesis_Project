import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import axios from "axios";
import AdminDashboard from "../adminDashbaord";
const AddBook = () => {
    const [bookImage, setBookImage] = useState ("");
    const [bookName, setBookName] = useState ("");
    const [bookPrice, setBookPrice] = useState ("");
    const [bookDescription, setBookDescription] = useState("");
    const [bargain, setBargain] = useState("");
    const [bookCategory,setBookCategory] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      };

    
      const addBook = (e) => {
        e.preventDefault();
        const priceRegex = new RegExp("^[0-9]+$");
        const numberRegex = new RegExp("[0-9]");
        const specialCharacterRegex = new RegExp('[!@#$%^&*(),.?":{}|<>]');
        if (
          bookName.trim() === "" ||
          bookCategory.trim() === "" ||
          bookPrice.trim() === "" ||
          bookDescription.trim() === "" ||
          bargain.trim() === ""
        ) {
          setMessage("Empty field found. Fill up the form completely.");
          return;
        } else if (bookName.length < 2) {
          setMessage("book Name most contain at least two characters.");
          return;
        } else if (bookDescription.length < 2) {
          setMessage("Description most contain at least two characters.");
          return;
        } else if (
          numberRegex.test(bookName) ||
          specialCharacterRegex.test(bookName)
        ) {
          setMessage(
            "Any numbers or special characters are not allowed in the book name."
          );
          return;
        }else if (!priceRegex.test(bookPrice)) {
          setMessage("Invalid book price.");
          return;
        }
        const bookData = new FormData();
        bookData.append("bookImage", bookImage);
        bookData.append("bookName", bookName);
        bookData.append("bookPrice", bookPrice);
        bookData.append("bookDescription", bookDescription);
        bookData.append("bookCategory", bookCategory);
        bookData.append("bargain", bargain);
       
       
        axios
          .post("http://localhost:4001/add/books", bookData, config)
          .then((result) => {
            console.log(result.data.data);
            if (result.data.success) {
              localStorage.setItem("_id", result.data.data._id);
             
              setMessage(result.data.message);
              navigate("/viewBook");
            //   navigate("/viewBook", { state: { _id: result.data.data._id } });
            }
          })
          .catch((e) => {
            setMessage(e.response.data.message);
          });
      };

    return (
        <>
        <Header></Header>
        <AdminDashboard>
        <div className="container">
        <div
          className="suggestion-message text-center mb-2"
          style={{ color: "red", fontWeight: "bold" }}
        >    
            {message}
        </div>
        <h1>Add Book</h1>
        <form>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Book Image</label>
            <div class="col-sm-10">
              <input
                type="file"
                class="form-control"
                onChange={(e) => setBookImage(e.target.files[0])}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Book Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Book Price</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                value={bookPrice}
                onChange={(e) => setBookPrice(e.target.value)}
              
              ></input>
            </div>
          </div>
        
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Book Description</label>
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
              
              ></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Price State</label>
            <div class="col-sm-10">
              <select
                className="custom-select custom-select-lg"
                style={{ width: "100%" }}
                value={bargain}
                onChange={(e) => setBargain(e.target.value)}
              >
               <option>Choose Price State</option>
                <option>Fixed Price</option>
                <option>Negotiable</option>
                
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Book Category</label>
            <div class="col-sm-10">
              <select
                className="custom-select custom-select-lg"
                style={{ width: "100%" }}
                value={bookCategory}
                onChange={(e) => setBookCategory(e.target.value)}
              >
               <option>Choose Category</option>
                <option>Fiction</option>
                <option>Non Fiction</option>
                <option>Love</option>
                <option>Horror</option>
                <option>Class 9</option>
                
              </select>
            </div>
          </div>
         
          <p>
            <button
              type="submit"
              className="btn btn-primary addBook"
              onClick={addBook}
            >
              Add Book
            </button>
          </p>
        </form>
      </div>
      </AdminDashboard>
      </>
    );
  }

export default AddBook;
