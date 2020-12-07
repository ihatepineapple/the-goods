import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AuthService from "../../services/auth-services";

const Profile = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const service = new AuthService();

    useEffect(() => {
        setLoggedInUser(props.userInSession);
      }, [props.userInSession]);

    if (loggedInUser) {
        return (
            <div>
            <h1>this is the profile of {loggedInUser.firstName}</h1>
                <h2>{loggedInUser.firstName} {loggedInUser.lastName} </h2>
                
                {/* <Link to="/projects"><button>Go Back</button></Link> */}
            </div>
        )
    }
}

export default Profile;
