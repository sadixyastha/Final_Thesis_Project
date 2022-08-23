import React, { useEffect } from "react";
import { Link} from "react-router-dom";
const Dashboard = ({children}) => {
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
                    <li>
                        <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Category</span> </Link>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/addCategory" className="nav-link px-0"> <span className="d-none d-sm-inline">Add Category</span> </Link>
                            </li>
                            <li>
                                <Link to ="/viewCategory" className="nav-link px-0"> <span className="d-none d-sm-inline">View Category</span> </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/viewOrders" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Users</span></Link>
                    </li>
                </ul>
            <hr />
                <div className="dropdown pb-4">
                    <Link to="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1">Sadikshya</span>
                    </Link> 
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">

                        <li><a className="dropdown-item" href="/">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="/">Sign out</a></li>
                    </ul>
                </div>
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
export default Dashboard;