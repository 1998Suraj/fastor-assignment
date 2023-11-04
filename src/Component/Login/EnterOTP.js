import "./EnterOTP.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnterOTP = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [focusedInput, setFocusedInput] = useState(0);
  const inputRefs = useRef([]);

  // Initialize refs for each input field
  useEffect(() => {
    // Focus on the currently focused input when the component mounts or when focusedInput changes
    if (inputRefs.current[focusedInput]) {
      inputRefs.current[focusedInput].focus();
    }
  }, [focusedInput]);

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input if a digit is entered and we are not at the last index
    if (value && index < otpValues.length - 1) {
      setFocusedInput(index + 1);
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      // If Backspace is pressed and the current input is empty, move focus to the previous input
      inputRefs.current[index - 1].focus();
    }
  };

  const navigate = useNavigate();
  const handleLogin = async () => {
    const enteredOtp = otpValues.join("");
      if (enteredOtp === "123456") {
        const request = await axios.post(
          "https://staging.fastor.in/v1/pwa/user/login",
          {
            phone: "9818979450",
            dial_code: "+91",
            otp: enteredOtp,
          }
        );
        localStorage.setItem("token", request.data.data.token);
        localStorage.setItem("userData", request.data.data);
        navigate("/restaurant");
      } else {
        alert("Invalid OTP. Please try 123456");
      }


  
  };

  return (
    <div className="otp-verification-container">
      <p className="heading-line">OTP Verification</p>
      <p className="second-line">
        We just send you a verification code please enter the OTP
      </p>
      <div className="enter-otp-container">
        {otpValues.map((value, index) => (
          <input
            className="code"
            key={index}
            type="text"
            placeholder="0"
            maxLength={1}
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleBackspace(index, e)}
            ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input field
          />
        ))}
      </div>
      <button className="btn" type="button" onClick={handleLogin}>
        Verify
      </button>
      <p className="last-line">
        Didn't recieved the code? <span className="last-inner-line">send</span>
      </p>
    </div>
  );
};

export default EnterOTP;
