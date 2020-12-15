import React, { useState } from "react";
import { Link  } from "react-router-dom";
import '../../assets/stylesheets/style.css';

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
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Log in</h2>
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

          <div><button className="black-btn" type="submit">Log in</button></div>
        </form>
        <br />
        <div><p>Not a member? <Link to="/signup" className="form-link">Sign up</Link></p></div>
        

        {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}
        </div>
    </div>
  );
};

export default Login;