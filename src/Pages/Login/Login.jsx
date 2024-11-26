import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="icon-container">
        <img src="public/img/market.png" alt="" style={{ height: "150px" }} />
      </div>
      <form className="login-form">
        <div className="input-container">
          <input type="text" placeholder="USERNAME" className="login-input" />
          <div className="input-icon">
            <i class="bi bi-person"></i>
          </div>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="PASSWORD"
            className="login-input"
          />
          <div className="input-icon">
          <i class="bi bi-key"></i>
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
