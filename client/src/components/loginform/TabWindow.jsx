import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const TabWindow = () => {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default TabWindow;
