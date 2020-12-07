import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
        <h1>Welcome to the creative pool</h1>
            <Link to="/projects"><h1> See All Projects</h1></Link>
            <Link to="/signup"><h3> Sign up</h3></Link>
            <Link to="/login"><h3> Log in</h3></Link>
        </div>
    )
}

export default Home
