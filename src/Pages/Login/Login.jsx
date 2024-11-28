import React, { useRef, useState } from "react";
import "./Login.css";
import { verifyUser } from "../../Data/Personels";

const Login = ({ setToken, setRole, setUsername }) => {
  const usernameRef = useRef();
  const passRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const name = usernameRef.current.value.trim();
    const pass = passRef.current.value.trim();

    // รีเซ็ตค่าหลังจากตรวจสอบ
    usernameRef.current.value = "";
    passRef.current.value = "";

    // ตรวจสอบข้อมูลผู้ใช้
    const userInfo = verifyUser(name, pass);

    if (userInfo === null) {
      alert("Wrong username or password");
      usernameRef.current.focus();
    } else {
      setToken(userInfo.token);  // ส่ง token ที่ถูกต้อง
      setRole(userInfo.role);     // ส่ง role ไปยัง Layouts
      setUsername(name);          // ส่ง username ไปยัง Layouts
    }
  };

  return (
    <div className="login-container">
      <div className="icon-container">
        <img src="public/img/market.png" alt="" style={{ height: "150px" }} />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="USERNAME" 
            className="login-input" 
            ref={usernameRef}
          />
          <div className="input-icon">
            <i className="bi bi-person"></i>
          </div>
        </div>
        <div className="input-container">
          <input  
            type="password"
            placeholder="PASSWORD"
            className="login-input"
            ref={passRef}
          />
          <div className="input-icon">
            <i className="bi bi-key"></i>
          </div>
        </div>
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
