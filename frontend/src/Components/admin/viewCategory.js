import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
import React from 'react';
import Dashboard from "./dashbaord";


const ShowCategory = () => {
  const [categoryData, setcategoryData] = useState([]);
  const [message, setMessage] = useState("");
  const [sMessage, setSMessage] = useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("adminToken"),
    },
  };
  console.log(config);

  useEffect(() => {
    axios
      .get(`http://localhost:4001/category/single`, config)
      .then((category) => {
        setcategoryData(category.data.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // getProduct()
  }, []);

  const deleteCategory = (cid) => {
    axios
      .delete("http://localhost:4001/category/delete/" + cid, config)
      .then((result) => {
        axios
          .get(`http://localhost:4001/category/single`, config)
          .then((category) => {
            setcategoryData(category.data.data);
          });
          
          setSMessage(result.data.message);
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      });
  };

  return (
    <div>
        <Dashboard>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
            <div className="mb-2">
              <div className="suggestion-message text-center">{message}</div>
              <div
                className="success-message text-center"
                style={{ color: "green", fontWeight: "bold" }}
              >
                {sMessage}
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" colSpan="2">
                          Category Name
                        </th>
                        <th scope="col" colSpan="2">
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.map((singleData) => {
                        return (
                          //  <tr>
                          <tr key={singleData._id}>
                            <td colSpan="2"> {singleData.categoryName}</td>
                            <td>
                              <button
                                className="btn btn-primary mb-2"
                                onClick={() => {
                                  deleteCategory(singleData._id);
                                }}
                              >
                                Delete Category
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Dashboard>
    </div>
  );
};

export default ShowCategory;
