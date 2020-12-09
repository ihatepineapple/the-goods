import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-services";
import '../../assets/stylesheets/style.css';


const initialState = { 
    firstName: "", 
    lastName: "",
    email: "",
    type: "",
    password: "",
};


const Signup = (props) => {
    const [registerForm, setRegisterForm] = useState(initialState);
    const [registerErrorMsg, setRegisterErrorMsg] = useState("");

    const service = new AuthService();

    const handleFormSubmit = (event) => {
        event.preventDefault();
    
        const { firstName, lastName, email, type, password } = registerForm;
    
        service
          .signup( firstName, lastName, email, type, password )
          .then((response) => {
            setRegisterForm(initialState);
            props.getUser(response);
          })
          .catch((error) => {
            const { message } = error.response.data;
            setRegisterErrorMsg(message);
            console.log(error);
          });
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterForm({ ...registerForm, [name]: value });
      };
    
    return (
      <div className="form-wrapper">
        <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={registerForm.firstName}
            onChange={handleChange}
          />

        <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={registerForm.lastName}
            onChange={handleChange}
          />

        <label>Email:</label>
          <input
            type="text"
            name="email"
            value={registerForm.email}
            onChange={handleChange}
          />  

        <div>
            <label>Who are you?</label>
            <br />
            <div>
                <input type="radio" name="type" value="talent" onChange={handleChange}/>
                <label>I am a freelancer</label>
                <input type="radio" name="type" value="business" onChange={handleChange}/>
                <label>I am looking for talent</label>
            </div>
            {/* <select name="type">
                <option value="talent">I am a freelancer</option>
                <option value="business">I am looking for talent</option>
            </select> */}
         
            
        </div>
  
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
          />
  
        <div><button className="black-btn" type="submit">Sign Up</button></div>
        </form>
        <br />
  
        {registerErrorMsg && <span style={{ color: "red" }}>{registerErrorMsg}</span>}

        </div>
  
        
      </div>
    );
  };
  
  export default Signup;
  
