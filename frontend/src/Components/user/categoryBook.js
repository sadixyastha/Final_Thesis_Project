import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const CategoryBook = () => {
  const [bookData, setBookData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  const { category } = useParams();
  console.log(category);
  useEffect(() => {
    axios
      .get("http://localhost:4001/books/category/" + category, config)
      .then((result) => {
        console.log(result.data);
        setBookData(result.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>{category}</h1>
            <hr />
          </div>
        </div>
      </div>

      <div className="meal-data container">
        {bookData.map((singleData) => {
          return (
            <div className="container py-3" style={{ width: "270px" }}>
              <div className="card-deck">
                <div className="card">
                {/* <NavLink
                  to={"/viewRecipe/" + singleData._id}
                  style={{ textDecoration: "none" }}
                > */}
                  <img
                    src={"http://localhost:4001/book/" + singleData.bookImage}
                    className="card-img-top"
                    style={{ height: "200px", width: "100%" }}
                  ></img>
                 <div class="card-body">
                      <p class="card-title" style={{fontSize:"14px"}}>{singleData.bookName}</p> <hr />
                      <p
                        class="card-text"
                        style={{ fontWeight: "bold", fontSize: "12px" }}
                      >
                        <label class="text mr-5">
                          Price: {singleData.bookPrice}
                        </label>
                        <label
                          class="text"
                          style={{ float: "right", marginTop: "1px" }}
                        >
                          <i class="fas fa-solid fa-timer"></i>
                          Time: 98
                        </label>
                      </p>
                    </div>
                {/* </NavLink> */}
                <div className="card-footer">
                <button className="btn sendMeal">Add To Cart</button>
                </div>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryBook;
