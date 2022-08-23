import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register =()=> {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_no, setPhone_No] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState ("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const userRegister = (e) => {
        e.preventDefault();
        setMessage("");
        const nameRegex = new RegExp("^[a-zA-Z0-9]+$");
        const passwordRegex = new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{5,15}$"
        );
        const emailRegex = new RegExp(
          "^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+.[a-zA-Z]+"
        );
        const numberRegex = new RegExp('[0-9]');
    
        if (
          email.trim() === "" ||
          password.trim() === "" ||
          firstName.trim() === "" ||
          lastName.trim() === ""
        ) {
          setMessage("Empty field found. Fill up the form completely.");
          return;
        } else if (firstName.length <= 2 || firstName.length >= 16) {
          setMessage("FirstName most contain 3 to 15 characters.");
          return;
        } else if (lastName.length <= 2 || lastName.length >= 16) {
          setMessage("LastName most contain 3 to 15 characters.");
          return;
        } else if (!nameRegex.test(firstName) || !nameRegex.test(lastName) ) {
          setMessage("Special characters and white spaces not allowed in name.");
          return;
        } else if( numberRegex.test(firstName) || numberRegex.test(lastName)){
          setMessage("Numbers not allowed");
          return;
        } else if (!passwordRegex.test(password)) {
          setMessage(
            "Provide at least one uppercase, lowercase, number, special character in password and it accepts only 5 to 15 characters."
          );
          return;
        } else if (!emailRegex.test(email)) {
          setMessage("Invalid email address.");
          return;
        }
    
        const userData = { firstName, lastName, email, password, phone_no, address, gender };
        axios
          .post("http://localhost:4001/signup", userData)
          .then((result) => {
            console.log(result);
            if (result.data.success) {
              localStorage.setItem("email", email);
              navigate("/otpPage", { state: { email: email } });
            }
          })
          .catch((e)=>{
            setMessage(e.response.data.message);
          });
      };
    return (
      <div className="container">
        <div className="row py-5 mt-4 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg"
              alt=""
              className="img-fluid mb-3 d-none d-md-block"
            />
            <h1 style={{ color: "black" }}>Create an Account</h1>
          </div>

          {/* <!-- Registeration Form --> */}
          <div className="col-md-7 col-lg-6 ml-auto">
            <form action="#" />
            {message}
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  {/* <!-- First Name --> */}
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className="form-control bg-white border-left-0 border-md"
                      required
                      value={firstName}
                      onChange= {(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  {/* <!-- Last Name --> */}
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      className="form-control bg-white border-left-0 border-md"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                  
                    />
                  </div>
                </div>
              </div>
              {/* <!--Gender --> */}
              <div className="input-group col-lg-12 mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="fa fa-user text-muted"></i>
                  </span>
                </div>
                <select
                  id="gender"
                  type="text"
                  name="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-control custom-select-form bg-white border-left-0 border-md"
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* <!-- Phone Number --> */}
              <div className="input-group col-lg-12 mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="fa fa-phone-square text-muted"></i>
                  </span>
                </div>
                <select
                  id="countryCode"
                  name="countryCode"
                  style={{
                    maxWidth: "58px",
                    padding: "0px 12px 0px 12px",
                  }}
                  className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted"
                >
                  <option value="">+12</option>
                  <option value="">+10</option>
                  <option value="">+15</option>
                  <option value="">+18</option>
                  <option value="">+977</option>
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control bg-white border-md border-left-0 pl-3"
                  required
                  value={phone_no}
                  onChange={(e) => setPhone_No(e.target.value)}
                />
              </div>

              {/* <!-- Email Address --> */}
              <div className="input-group col-lg-12 mb-4">
                <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="fa fa-envelope text-muted"></i>
                  </span>
                </div>

                <input
                  id="phoneNumber"
                  type="tel"
                  name="phone"  
                  placeholder="Email"
                  className="form-control bg-white border-md border-left-0 pl-3"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className="input-group col-lg-7 mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="fa fa-envelope text-muted"></i>
                  </span>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control bg-white border-left-0 border-md"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div> */}

              {/* <!-- Address --> */}
              <div className="input-group col-lg-12 mb-4">
                <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="fa fa-map-marker text-muted"></i>
                  </span>
                </div>

                <input
                  id="phoneNumber"
                  type="tel"
                  name="phone"  
                  placeholder="Address"
                  className="form-control bg-white border-md border-left-0 pl-3"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* <div className="input-group col-lg-5 mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="fa fa-map-marker text-muted"></i>
                  </span>
                </div>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control bg-white border-left-0 border-md"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div> */}
                {/* ------Password--------- */}
                <div className="input-group col-lg-12 mb-4">
                <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                </div>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
              </div>

              {/* -------Confirmation Password------------ */}
              <div className="input-group col-lg-12 mb-4">
                <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                </div>
                <input
                    type="password"
                    className="form-control"
                    id="verifyPassword"
                    placeholder="Confirm Password"
                    />
              </div>
              {/* <div className="col-md-12">
                <div className="row">
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                    </div>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </div> */}

                  {/* <!-- Password Confirmation --> */}
                  {/* <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                    </div>
                    <input
                    type="password"
                    className="form-control"
                    id="verifyPassword"
                    />
                  </div>
                </div>
              </div> */}
              {/* <!-- Submit Button --> */}
              <div className="form-group col-lg-12 mx-auto mb-0">
                <button
                  onClick={userRegister}
                  className="btn btn-primary btn-block py-2"
                >
                  <span className="font-weight-bold">Create your account</span>
                </button>
              </div>

              {/* <!-- Divider Text --> */}
              <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                <div className="border-bottom w-100 ml-5"></div>
                <span className="px-2 small" style={{ color: "black" }}>
                  OR
                </span>
                <div className="border-bottom w-100 mr-5"></div>
              </div>

              

              {/* <!-- Already Registered --> */}
              <div className="text-center w-100" style={{ color: "black " }}>
                <p className=" ">
                  Already Registered?{" "}
                  <a href="/login" className="text-primary ml-2">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }

export default Register;
