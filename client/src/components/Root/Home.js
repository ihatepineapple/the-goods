import React from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/style.css';
import logo from '../../assets/images/the-goodsW.png';

const Home = () => {
    return (
        <div>
        <div className="landing-box">
            <img className="landing-img" src={logo} alt="the-goods"/>
            <h1 className="landing-h1">Welcome to the creative pool</h1>
            <h2 className="landing-h2">Connect, collaborate and hire our community.</h2>
            <Link to="/signup"><button className="signup-btn"> Sign up</button></Link>
        </div>
        
           
            
            <Link to="/login"><h3> Log in</h3></Link>
        </div>
    )
}

export default Home
