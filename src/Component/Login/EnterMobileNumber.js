import axios from "axios";
import "./EnterMobileNumber.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterMobileNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const handleNext = async () => {
    const request = await axios.post(
      "https://staging.fastor.in/v1/pwa/user/register",
      {
        phone: mobileNumber,
        dial_code: "+91",
      }
    );

    if (request.status === 200 && mobileNumber.length === 10) {
      navigate("/otp");
    } else if (mobileNumber.length === 0) {
      alert("Please enter the number");
    } else {
      alert("Please enter valid the number");
    }
  };
  return (
    <div className="mobile-number-container">
      <p className="heading-line">Enter Your Mobile Number</p>
      <p className="second-line">
        We will send you the 4 digit verification conde
      </p>
      <input
        type="text"
        placeholder="Enter Your Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      ></input>
      <button type="btn" onClick={handleNext}>
        Send Code
      </button>
    </div>
  );
};

export default EnterMobileNumber;
