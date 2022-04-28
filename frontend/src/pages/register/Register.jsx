import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const username = useRef();
  const email = useRef(); // useRef() can surveillance email <input> when add ref={email} // <input の属性を監視することができる
  const password = useRef(); // add ref={password}
  const passwordConfirmation = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check before password and passwordConfirmation
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity('Password is not match!'); // setCustomValidity is validate function
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        // registerAPI from routes/auth.js
        await axios.post('/auth/register', user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">SNS</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">Register</p>
            <input
              type="text"
              className="loginInput"
              placeholder="User Name"
              required
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Passowrd"
              required
              ref={password}
              minLength="6"
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Confirm Passowrd"
              required
              minLength="6"
              ref={passwordConfirmation}
            />
            <button className="loginButton" type="submit">
              Signup
            </button>
            <button className="loginRegisterButton">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
