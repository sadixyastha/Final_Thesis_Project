import React, { useEffect } from "react";
import { Link, Router } from "react-router-dom";
const AdminDashboard = ({children}) => {
    useEffect(() => {
        console.log("fsdf");
    }, [])
        return (
            <>
        <div className="container-fluid">
        <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <h4>Admin Dashboard</h4>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {/* <li className="nav-item">
                        <Link to="/" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Book</span> </Link>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/addBook" className="nav-link px-0"> <span className="d-none d-sm-inline">Add Book</span> </Link>
                            </li>
                            <li>
                                <Link to ="/viewBook" className="nav-link px-0"> <span className="d-none d-sm-inline">View Book</span> </Link>
                            </li>
                        </ul>
                    </li>

                    {/* <li>
                        <Link to="/viewOrders" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span></Link>
                    </li> */}

                    {/* <li>
                        <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Books</span> </Link>
                            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/addMeal" className="nav-link px-0"> <span className="d-none d-sm-inline">Add Books</span> </Link>
                            </li>
                            <li>
                                <Link to="/viewMeal" className="nav-link px-0"> <span className="d-none d-sm-inline">View Book</span> </Link>
                            </li>
                        </ul>
                    </li> */}

                  
                    <li>
                        <Link to="/viewReview" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Review</span> </Link>
                    </li>

                  
                </ul>
            <hr />
            </div>
        </div>
        <hr/>
        <div className="col py-3">
                        {children}
        </div>
    </div>
</div>
</>
        )
    }
export default AdminDashboard;