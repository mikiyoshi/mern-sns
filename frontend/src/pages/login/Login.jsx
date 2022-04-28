import React, { useContext, useRef } from 'react';
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import './Login.css';

export default function Login() {
  const email = useRef(); // useRef() can surveillance email <input> when add ref={email} // <input の属性を監視することができる
  const password = useRef(); // add ref={password}
  console.log(email); // result is { current: <input class="loginInput" type="email" placeholder="Email" required=""> ...
  const { user, isFetching, error, dispatch } = useContext(AuthContext); // AuthContext is global Auth data from AuthContext.js

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value); // email.current.value can get a input form value
    // console.log(password.current.value);
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch // dispatch start LOGIN_START from actionCalls.js // dispatch action start by onSubmit from Login.jsx form
    );
  };

  console.log('Login.jsx: ', user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">SNS</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">Login</p>
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
              minLength="6"
              ref={password}
            />
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot Your Password?</span>
            <button className="loginRegisterButton">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
