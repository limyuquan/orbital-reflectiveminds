import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Loader from "../shared/loader";


const RegisterForm = (props) => {
  const navigate = useNavigate();

  const user = {
    newUsername: "",
    newPassword: "",
    newEmail: "",
  };

  const [userState, setUserState] = useState(user);
  const [showLoader, setShowLoader] = useState(false);

  const handleInputChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  //record down details
  const handleRegisterButton = (event) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    event.preventDefault();
    setShowLoader(true);
    if (userState.newPassword.length < 8) {
      setShowLoader(false);
      alert("Invalid password. Password must be at least 8 characters long.");
    } else {
      fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userState)
      })
      .then(response => response.json())
      .then(data => {
        setShowLoader(false);
        if (data["status"] != "Success") {
          alert("This account exists! Username or email is already in use!");
        } else {
          navigate("/login");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setShowLoader(false);
        alert("Error encountered");
        
      });

    }
  };

  return (
    <div className="register">
      {showLoader && <Loader />}
      <form className="register-form" onSubmit={handleRegisterButton}>
        <h1 className="title">Register</h1>
        <div className="register-input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={userState.newUsername}
            onChange={handleInputChange}
            name="newUsername"
          />
        </div>

        <div className="register-input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={userState.newEmail}
            onChange={handleInputChange}
            name="newEmail"
          />
        </div>

        <div className="register-input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={userState.newPassword}
            onChange={handleInputChange}
            name="newPassword"
          />
        </div>

        <div className="register-button-wrapper">
          <button type="submit" className="register-button">
            Create account
          </button>
        </div>

        <div className="back-button-wrapper"> 
        <button type="button" className="back" onClick={() => navigate('/login')}>
          Back
        </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
