import React, { useEffect, useState } from "react";
import Header from "../header";
import axios from "axios"
import { Link, NavLink } from "react-router-dom";


const Books = () => {
    const [bookData, setBookData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
  

    const config = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken")
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:4001/book/all")
        .then((result) => {
            console.log(result.data);
            setBookData(result.data.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

    useEffect(() => {
      axios
        .get("http://localhost:4001/category/all")
        .then((category) => {
          console.log(category.data.data);
          setCategoryData(category.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);

    
    return (
        <>
        <Header></Header>
      <div className="container-fluid pt-5 productBody">
        <div className="row">
      {/* ----------------------------------------Category------------------------------------ */}
        <div
            className="col-md-4 order-md-1 col-lg-3 sidebar-filter"
            style={{ color: "black" }}
          >
            <h1 className="text-uppercase  mb-3">Categories</h1>
            <div className="mt-2 mb-2 pl-2">
              {categoryData.map((category)=> {
                return(
              <div className="custom-control custom-checkbox">
                <Link className="dropdown-item" to={"/categoryBook"}>
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="category-1"
                />
                <label className="custom-control-label" for="category-1">
                 {category.categoryName}
                </label>
                </Link>
              </div>
                )
              })}
            </div>
            {/* <div className="mt-2 mb-2 pl-2">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="category-2"
                />
                <label className="custom-control-label" for="category-2">
                  Power Tools
                </label>
              </div>
            </div> */}
            {/* <div className="mt-2 mb-2 pl-2">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="category-3"
                />
                <label className="custom-control-label" for="category-3">
                  Gardening Tool
                </label>
              </div>
            </div> */}
            
          </div>

          {/* ------------------------------Books----------------------------------------- */}
          <div className="col-md-8 order-md-2 col-lg-9">
            <div className="container-fluid">
              <div className="row">
                  <>
                  {bookData.map((singleData)=>{
                    return(
                    <div className="col-6 col-md-6 col-lg-4 mb-3">
                      <div className="card h-100 border-0">
                        <div className="card-img-top">
                          <img
                            src={"http://localhost:4001/book/"+singleData.bookImage}
                            className="img-fluid mx-auto d-block productPage"
                            alt="Card image cap" style={{height:"340px", width:"270px"}}
                          />
                        </div>
                        <div className="card-body text-center">
                          <h4 className="card-title">
                            <h2
                              className=" font-weight-bold text-dark text-uppercase large"
                              style={{fontSize:"15px"}}
                            >
                              {" "}
                              {singleData.bookName}
                            </h2>
                          </h4>
                          <div>
                          <h6 className="card-price  text-primary">
                            <i>Rs.{singleData.bookPrice}</i>
                            <i style={{marginLeft:"55px", color:"red"}}>{singleData.bargain}</i>
                          </h6>
                          
                          </div>
                          <div className="form-group col-lg-11 mx-auto mb-0">
                            <NavLink to = {"/viewDetail" + singleData._id}>
                            <button
                              className="btn btn-warning btn-block py-2" 
                            >
                              <span className="font-weight-bold">
                                View Details
                              </span>
                            </button>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                })}
             
                  </>
              </div>
            </div>
          </div>
         
        </div>
      
      </div>
      </>
    );
}

export default Books;
