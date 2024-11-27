import React, { useRef } from "react";
import "./Login.css";
import { verifyUser } from "../../Data/Personels";

const Login = ({ setToken }) => {
  const usernameRef = useRef();
  const passRef = useRef();

  const handleLogin = (e) => {
    // ป้องกันไม่ให้ฟอร์มรีเฟรช
    e.preventDefault();

    const name = usernameRef.current.value.trim();
    const pass = passRef.current.value.trim();

    // รีเซ็ตค่าในฟอร์ม
    usernameRef.current.value = "";
    passRef.current.value = "";

    // ตรวจสอบข้อมูลผู้ใช้
    const userInfo = verifyUser(name, pass);

    // ถ้าผู้ใช้ไม่ถูกต้อง จะแสดง alert
    if (userInfo === null) {
      alert("Wrong username or password");
      usernameRef.current.focus();  // ย้าย focus ไปที่ช่องกรอกชื่อผู้ใช้
    } else {
      setToken(userInfo.token);  // ถ้าผ่าน จะส่ง token
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
            id="username"
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
            id="pass"
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
      <a href="/forgot-password" className="forgot-password-link">
        Forgot password?
      </a>
    </div>
  );
};

export default Login;
