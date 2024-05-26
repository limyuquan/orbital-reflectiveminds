import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaUserLarge, FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const RegisterForm = (props) => {
  const navigate = useNavigate();

  const user = {
    newUsername: "",
    newPassword: "",
    newEmail: "",
  };

  const [userState, setUserState] = useState(user);

  const handleInputChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  //record down details
  const handleRegisterButton = (event) => {
    event.preventDefault();
    if (userState.newPassword.length < 8) {
      alert("Invalid password. Password must be at least 8 characters long.");
    } else {
      axios
        .post("/api/register", userState, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data["status"] != "Success") {
            alert("This account exists!");
          } else {
            navigate("/login");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="register">
      <form id="register-form" onSubmit={handleRegisterButton}>
        <h1>Create account</h1>

        <div className="input-box">
          <FaUserLarge className="icon1" />
          <input
            type="text"
            placeholder="Username"
            required
            value={userState.newUsername}
            onChange={handleInputChange}
            name="newUsername"
          />
        </div>

        <div className="input-box">
          <MdEmail className="icon2" />
          <input
            type="email"
            placeholder="Email"
            required
            value={userState.newEmail}
            onChange={handleInputChange}
            name="newEmail"
          />
        </div>

        <div className="input-box">
          <FaLock className="icon3" />
          <input
            type="password"
            placeholder="Password"
            required
            value={userState.newPassword}
            onChange={handleInputChange}
            name="newPassword"
          />
        </div>

        <button type="submit" className="button">
          Register
        </button>
      </form>

      <button type="submit" className="back" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default RegisterForm;
