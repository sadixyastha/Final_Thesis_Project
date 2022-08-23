import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header";

const ViewBookDetail = () => {
    const [bookImage, setBookImage] = useState([]);
    const [bookName, setBookName] = useState();
    const [bookDescription, setBookDescription] = useState();
    const [bargain, setBargain] = useState("");
    const [bookPrice, setBookPrice] = useState("");
    const [bookCategory,setBookCategory] = useState("");

    const config = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
        }
    };

    const {bid} = useParams();

    useEffect(() => {
        axios.get("http://localhost:4001/books/single/view/" + bid, config)
        .then((result) => {
            console.log(result.data.data);
            setBookImage(result.data.data.bookImage);
            setBookName(result.data.data.bookName);
            setBookDescription(result.data.data.bookDescription);
            setBookPrice(result.data.data.bookPrice);
            setBargain(result.data.data.bargain);
            setBookCategory(result.data.data.bookCategory);
        })
        .catch((e) => {
            console.log(e);
        });
    }, []);
    return(
        <>
        <Header></Header>
        <div className="container my-5 py-3">
            <div className="row" >
                <div className="col-md-6 d-flex justify-content-center mx-auto product">
                    <div>
                    <img src = {"http://localhost:4001/book/" + bookImage} alt ="" style={{height: "500px"}}></img> 
                    <br/>  <br/> 
                    <div>
                        <h3>Sambhav Shrestha</h3>
                    {/* <h3>{user_id.firstName}</h3> */}
                    {/* <i
                    class="fas fa-solid fa-phone"
                    style={{ height: "40px", marginTop: "8px",marginLeft: "10px",
                    color: "black"
                    }}
                    ></i> */}
                    <h4 style={{floatLeft:"100px"}}>9874585625</h4>
                    </div>
                    
                    <button className="btn btn-outline-primary" >
                                    Chat Now
                                 </button> 
                    </div>
                  
                </div>
                <div className="col-md-6  justify-content-center">
                    
                    <h1 className="display-5 fw-bold">Description</h1> <hr></hr>
                    <h2>Book Name: <span style={{"fontWeight":"normal"}}>{bookName}</span></h2>
                    <h2 className="my-4">Price: <span style={{"fontWeight":"normal"}}>Rs. {bookPrice} </span></h2>
                    <h2 className="my-4">Bargain: <span style={{"fontWeight":"normal"}}>{bargain} </span> </h2>
                    <h2 className="my-4">Category: <span style={{"fontWeight":"normal"}}> {bookCategory} </span></h2>
                    <h2 className="my-4">Description: <br/> <span style={{"fontWeight":"normal"}}> {bookDescription} </span></h2>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default ViewBookDetail;