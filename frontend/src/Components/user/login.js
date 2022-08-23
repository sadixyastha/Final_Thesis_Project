import axios from "axios";
import { useState } from "react";
import React from "react";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMessage("Email is required.");
      return;
    } else if (password.trim() === "") {
      setMessage("Password is required.");
      return;
    }

    const userData = {
      email,
      password,
    };
    axios
      .post("http://localhost:4001/user/login", userData)
      .then((result1) => {
        if (result1.data.token) {
          if (result1.data.userData.admin === false) {
            localStorage.setItem("userToken", result1.data.token);
            navigate("/");
          } else if (result1.data.userData.admin === true) {
            localStorage.setItem("adminToken", result1.data.token);

            navigate("/viewCategory");
          }
        }
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      });
  };
  return (
    <>
    
      <div>
        <div className="col-md-6 d-flex justify-content-center mx-auto ">
          <div className="container">
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "50px",
                textAlign: "center",
              }}
            >
              {message}
            </p>
            <div
              className="col-md-6 d-flex justify-content-center mx-auto "
              style={{ marginTop: "40px" }}
            >
              <div className="row">
                <div className="container text-center">
                  <img src="images/logo.png" className="log" style={{height:"200px"}}></img>
                </div>
                <div className="col-md-4">
                  <form id="loginForm">
                    <div className="form-group mt-4">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "600px" }}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        style={{ width: "600px" }}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="form-group form-check mt-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberme"
                        ></input>
                        <label className="form-check-label" for="rememberme">
                          Remember Me
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="Submit"
                        className="btn btn-light login"
                        style={{ width: "fit-content" }}
                        id="loginBtn"
                        onClick={userLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  
                </div>
                <div className="card border-0" style={{ width: "100%" }}>
                    
                      <div className="container text-center">
                        Don't have an account?{" "}
                        <Link className="link" to="/register">
                          SignUp
                        </Link>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
