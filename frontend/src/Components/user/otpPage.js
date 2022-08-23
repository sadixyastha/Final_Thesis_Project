import { useState, useEffect } from "react";
import axios from "axios";
import React from "react"

import { useLocation, useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [sResponse, setSResponse] = useState("");

  const location = useLocation();

  useEffect(() => {
    try {
      if (localStorage.getItem("email")) {
        console.log(location.state.email);
        setSResponse(location.state.email);
      }
    } catch (error) {
      console.log("Email not recognized.", error);
    }
  }, []);

  const verifyOtp = (e) => {
    e.preventDefault();
    const otpData = {
      otp: otp,
      email: sResponse,
    };

    axios
      .post("http://localhost:4001/user/verify", otpData)
      .then((result) => {
        if (result.status === 200) {
          setMessage("User Verification successfully!!!");
          window.location.replace("/login");
        } 
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      });
  };

  return (
    <div>

      <div className="mb-2" style={{color: "red",
                fontWeight: "bold",
                marginTop: "100px",}}>   
                        <div className="success-message text-center">{message}</div>  
                    </div>
      <div
        className="col-md-6 d-flex justify-content-center mx-auto "
        style={{ marginTop: "40px" }}
      >
      
        <div className="panel panel-info">
          <div className="panel-heading">
            <div
              className="panel-title text-center"
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              Enter OTP
            </div>
          </div>
          <div style={{ paddingTop: "30px" }} className="panel-body">
            <form>
              <div style={{ marginBottom: "25px" }}>
                <label className="text-success">Check your email for OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  placeholder="One Time Password"
                  style={{ width: "600px" }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div style={{ marginTop: "10px" }} className="form-group">
                <div className="col-sm-12 controls">
                  <input
                    type="submit"
                    name="authenticate"
                    value="Submit"
                    className="btn-success"
                    style={{ borderRadius: "10px", textAlign:"center" }}
                    onClick={verifyOtp}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
