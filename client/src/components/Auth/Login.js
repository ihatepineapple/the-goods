import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import AuthService from "../../services/auth-services";

const initialState = { email: "", password: "" };

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const service = new AuthService();

  // Function to handle form submit in the input fields
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = loginState;

    service
      .login(email, password)
      .then((response) => {
        setLoginState(initialState);
        props.getUser(response);
      })
      .catch((error) => {
        // const { message } = error.response.data;
        // setLoginErrorMsg(message);
        console.log(error);
      });
  };

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={loginState.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
        />

        <button type="submit">Log in</button>
      </form>
      <br />

      {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}

      
    </div>
  );
};

export default Login;