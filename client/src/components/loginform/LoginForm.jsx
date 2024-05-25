import React, { useState } from "react";
import "./LoginForm.css";
import { FaUserLarge, FaLock } from "react-icons/fa6";
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
        "/api/login",
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
          console.log(response.data)
          navigate("/dashboard");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="wrapper">
      <form action="" onSubmit={handleLoginButton}>
        <h1>Login</h1>
        <div className="input-box">
          <FaUserLarge className="icon1" />
          <input
            type="text"
            placeholder="Username"
            required
            value={userState.username}
            onChange={handleInputChange}
            name="username"
          />
        </div>

        <div className="input-box">
          <FaLock className="icon2" />
          <input
            type="password"
            placeholder="Password"
            required
            value={userState.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button type="submit" className="button">
          Login
        </button>
      </form>

      <div className="register-link">
        <p>
          Don't have an account?
          <Link to="/register"> Click here </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
