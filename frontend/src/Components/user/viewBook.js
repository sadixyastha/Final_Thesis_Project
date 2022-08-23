import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../header";
import AdminDashboard from "../adminDashbaord";


const ViewBook = () => {
  const [bookData, setBookData] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:4001/books/all", config)
      .then((result) => {
        // console.log(result.data.data);
        setBookData(result.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteBook = (bid) => {
    axios
      .delete("http://localhost:4001/books/delete/" + bid, config)
      .then((result) => {
        axios.get(`http://localhost:4001/books/all`, config).then((result1) => {
          setBookData(result1.data.data);
        });
        // console.log(result.data);
      })
      .catch();
  };

  return (
    <>
    <Header></Header>
    <AdminDashboard>
    
      <br />
      
      <br />
      <div style={{ marginTop: "0px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="container">
                <div className="row">
                  <div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" colSpan="6">
                            Image
                          </th>
                          <th scope="col" colSpan="6">
                            Name
                          </th>
                          <th scope="col" colSpan="6">
                            Price
                          </th>
                          <th scope="col" colSpan="6">
                            Category
                          </th>
                          <th scope="col " colSpan="6">
                            Bargain
                          </th>
                          <th scope="col" colSpan="6">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookData.map((singleData) => {
                          return (
                            <tr key={singleData._id}>
                              <th scope="row"></th>
                              <td>
                                <img
                                  src={
                                    "http://localhost:4001/book/" +
                                    singleData.bookImage
                                  }
                                  height="100px"
                                />
                              </td>
                              <td colSpan="6"> {singleData.bookName}</td>
                              <td colSpan="6"> {singleData.bookPrice}</td>
                              <td colSpan="6"> {singleData.bookCategory}</td>
                              <td colSpan="6">{singleData.time}</td>
                              <td colSpan="6"> {singleData.bargain}</td>

                              <td colSpan="6">
                                <div style={{ float: "left" }}>
                                  <NavLink to={"/updateBook/" + singleData._id}>
                                    <button
                                      className="btn btn-primary mb-2"
                                      style={{
                                        backgroundColor: "#FF7800",
                                        border: "none",
                                      }}
                                    >
                                      Update
                                    </button>
                                  </NavLink>

                                  <button
                                    className="btn btn-primary mb-2"
                                    style={{
                                      backgroundColor: "#FF7800",
                                      border: "none",
                                      marginLeft: "10px",
                                    }}
                                    onClick={() => {
                                      deleteBook(singleData._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
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
      </div>
      </AdminDashboard>
    </>
  );
};
export default ViewBook;
