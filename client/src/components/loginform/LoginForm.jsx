import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import Loader from "../shared/loader";


const LoginForm = (props) => {
  const navigate = useNavigate();

  const user = {
    username: "",
    password: "",
  };

  const [userState, setUserState] = useState(user);
  const [showLoader, setShowLoader] = useState(false);

  const handleInputChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  //log in success => go dashboard, log in fail => alert fail
  const handleLoginButton = async (event) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    event.preventDefault();
    setShowLoader(true);
    const body = {
      username: userState.username,
      password: userState.password,
    }
    fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status != "Success") {
          alert("Account does not exist! Incorrect username or password!");
        } else {
          navigate("/dashboard", { state: { userId: data.userId } });
        }
        setShowLoader(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error encountered");
        setShowLoader(false);
      });
    // axios
    //   .post(
    //     `${apiUrl}/api/auth/login`,
    //     {
    //       username: userState.username,
    //       password: userState.password,
    //     },
    //     {
    //       headers: {
    //         "content-type": "application/x-www-form-urlencoded",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.data["status"] != "Success") {
    //       alert("Account does not exist! Incorrect username or password!");
    //     } else {
    //       navigate("/dashboard", { state: { userId: response.data.userId } });
    //     }
    //     setShowLoader(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Error encountered");
    //     setShowLoader(false);
    //   });
  };

  return (
    <div className="login">
      {showLoader && <Loader />}
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
