import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import LogoB from '../../assets/images/logoB.png';

import AuthService from "../../services/auth-services";

const Navbar = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  const logoutUser = () => {
    service.logout().then(() => {
      setLoggedInUser(null);
      props.getUser(null);
    });
  };

  if (loggedInUser) {
    return (
      <nav className="nav-style-loggedin">
        <div>
          <Link to="/"><img src={LogoB} alt="the-goods" style={{height: "30px", padding: "10px"}}/></Link>
        </div>
        <div><ul>
          <li><span className="userName">Welcome, {loggedInUser.firstName}</span></li>
          <li>
            <Link to="/projects" style={{ textDecoration: "none" }}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logoutUser}>
              Logout
            </Link>
          </li>
        </ul></div>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="nav-style">
        <div>
          <Link to="/"><img src={LogoB} alt="the-goods" style={{height: "30px", padding: "10px"}}/></Link>
        </div>
        <div>
        <ul>
            <li>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Log in
              </Link>
            </li>
            <li>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
          
        </nav>
      </div>
    );
  }
};

export default Navbar;