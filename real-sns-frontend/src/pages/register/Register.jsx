import React from 'react';
import './Register.css';

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">SNS</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <p className="loginMsg">Register</p>
            <input type="text" className="loginInput" placeholder="User Name" />
            <input type="text" className="loginInput" placeholder="Email" />
            <input type="text" className="loginInput" placeholder="Passowrd" />
            <input
              type="text"
              className="loginInput"
              placeholder="Confirm Passowrd"
            />
            <button className="loginButton">Signup</button>
            <button className="loginRegisterButton">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
