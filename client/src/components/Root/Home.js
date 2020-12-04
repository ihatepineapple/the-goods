import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
        <h1>Welcome to the creative pool</h1>
            <Link to="/projects"><h1> See All Projects</h1></Link>
        </div>
    )
}

export default Home
