import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const user = {
    username: "",
    password: "",
  };

  const [userState, setUserState] = useState(user);

  const handleInputChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  //log in success => go dashboard, log in fail => alert fail
  const handleLoginButton = async (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/auth/login",
        {
          username: userState.username,
          password: userState.password,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data["status"] != "Success") {
          alert("Account does not exist! Incorrect username or password!");
        } else {
          navigate("/dashboard", { state: { userId: response.data.userId } });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login">
      <form className="login-form" action="" onSubmit={handleLoginButton}>
        <h1 className="title">Login</h1>
        <div className="login-input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={userState.username}
            onChange={handleInputChange}
            name="username"
          />
        </div>

        <div className="login-input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={userState.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>
         
        <div className="login-button-wrapper">
        <button type="submit" className="login-button">
          Login
        </button>
        </div>

        <div className="register-link">
        <p>
          Don't have an account?
          <Link className="click-here" to="/register"> Click here </Link>
        </p>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;
