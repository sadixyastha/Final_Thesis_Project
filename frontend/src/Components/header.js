import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const logout = () => {
      localStorage.clear();
      window.location.replace("/");
    }
    var menu;
    if (localStorage.getItem("userToken")){
      menu = (
        <>
        <nav
                className="navbar navbar-expand-lg navbar-light ftco_navbar bg-light ftco-navbar-dark "
                id="ftco-navbar"
              >
                <div className="container-fluid">
                  <Link className="navbar-brand" to="">
                    <img
                      src={"images/logo.png"}
                      style={{ height: "90px", marginLeft: "80px" }}
                    />
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ftco-nav"
                    aria-controls="ftco-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="oi oi-menu"></span> Menu
                  </button>

                  <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          <i className="fa fa-fw fa-home"></i> Home
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="/books">
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>{" "}
                          Product
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="/aboutUs" className="nav-link">
                          <i className="fas fa-info"></i> About Us
                        </a>
                      </li>

                      <li className="nav-item">
                        <Link to="" className="nav-link">
                          <i className="fa fa-fw fa-envelope"></i> Contact
                        </Link>
                      </li>

                      <li
                        className="nav-item dropdown"
                        style={{ listStyle: "none" }}
                      >
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-user-alt fa-1.5x"> Account</i>
                        </a>
                        <div className="dropdown-menu">
                           
                          
                            <>
                              <Link className="dropdown-item" to="">
                                Profile
                              </Link>
                              <Link className="dropdown-item" to="/viewBook">
                                Dashboard
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#" onClick={logout}
                              >
                                Logout
                              </Link>
                            </>
                          
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

        </>
      );
    }else{
      menu = (
        <>
        <nav
                className="navbar navbar-expand-lg navbar-light ftco_navbar bg-light ftco-navbar-dark "
                id="ftco-navbar"
              >
                <div className="container-fluid">
                  <Link className="navbar-brand" to="">
                  <img
                      src={"images/logo.png"}
                      style={{ height: "90px", marginLeft: "80px" }}
                    />
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ftco-nav"
                    aria-controls="ftco-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="oi oi-menu"></span> Menu
                  </button>

                  <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          <i className="fa fa-fw fa-home"></i> Home
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>{" "}
                          Product
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="" className="nav-link">
                          <i className="fas fa-info"></i> About Us
                        </a>
                      </li>

                      <li className="nav-item">
                        <Link to="" className="nav-link">
                          <i className="fa fa-fw fa-envelope"></i> Contact
                        </Link>
                      </li>

                      <li
                        className="nav-item dropdown"
                        style={{ listStyle: "none" }}
                      >
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-user-alt fa-1.5x"> Account</i>
                        </a>
                        <div className="dropdown-menu">
                            <>
                              <Link className="dropdown-item" to="/login">
                                Signin
                              </Link>
                              <Link className="dropdown-item" to="/register">
                                Create An Account
                              </Link>
                            </>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
        </>
      );
    }
    return (
    <>
      <div>
        {menu}
      </div>
    </>
      
    );
  }
}

export default Header;
