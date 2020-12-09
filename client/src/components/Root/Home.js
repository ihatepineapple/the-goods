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
                <Link to="/signup"><button className="black-btn"> Sign up</button></Link>
            </div>
            <div className="landing-info">
                <article className="landing-snippet">
                    <h2>Quality work</h2>
                    <p>Find the right freelancer to begin working on your project within minutes.</p>
                </article>
                <article className="landing-snippet">
                    <h2>Simple Solutions</h2>
                    <p>Thousands of the best brands, agencies and companies rely on The Goods to help them find candidates that will push their company forward. </p>
                </article>
                <article className="landing-snippet">
                    <h2>Winner mindset</h2>
                    <p>Find the talent needed to get your business growing. You've got the job? We've got the goods.</p>
                </article>
            </div>
           <footer>
               <div className="footer-info">
                    <p>This is a student project made by Irene Asensio.<br />
                    This is my final project for the 9-Week web development bootcamp at Ironhack.
                    I made this using React, Mongoose, and Node.<br />
                    December 2020.</p>
               </div>
               <div className="footer-links">
                    <p>Visit my <a href="https://www.linkedin.com/in/ireneasensio/">LinkedIn</a> profile</p>
                    <p>Visit my <a href="https://github.com/ihatepineapple/">GitHub</a> for more projects</p>
               </div>
           </footer>
            
            {/* <Link to="/login"><h3> Log in</h3></Link> */}
        </div>
    )
}

export default Home
