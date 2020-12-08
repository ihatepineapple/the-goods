import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProfileForm from "./Forms/EditProfileForm"

import AuthService from "../../services/auth-services";

const Profile = (props) => {
    // const [loggedInUser, setLoggedInUser] = useState(null);
    const [profileDetails, setProfileDetails] = useState({});

    const service = new AuthService();

    const getProfileDetails = () => {
       
        const id  = props.loggedInUser._id;
    
        axios
          .get(`http://localhost:5000/api/profile/${id}`, {
            withCredentials: true,
          })
          .then((responseFromApi) => {
            setProfileDetails(responseFromApi.data);
          })
          .catch((error) => console.error(error));
      };
    
    useEffect(getProfileDetails, [props.loggedInUser._id]);

    // const getUserProjects = () = {

    // }
   
    if (props.loggedInUser) {
        return (
            <div>
            <h1>this is the profile of {profileDetails.firstName}</h1>
                <div className="info-container">
                    <h3>{profileDetails.firstName} {profileDetails.lastName}</h3>
                    <p>{profileDetails.creativeFields}</p>
                    <h5><b>Location:</b>{profileDetails.location}</h5>
                    <h5><b>Portfolio:</b>{profileDetails.extWeb}</h5>
                    <p><b>About:</b>{profileDetails.about}</p>
                    <Link to={`/profile/${props.loggedInUser._id}/edit`}>Edit Profile</Link>
                </div> 
                
                    <h4>Project List</h4>
                    {/* {profileDetails.projects.map((project) => {
                        return (
                            <div key={project._id} className="projects-list">
                            <Link to={`/projects/${project._id}`}>
                                <h3>{project.title}</h3>
                            </Link>
                            <img src={project.heroImage} alt={project.title} height="200" />
                            </div>
                        );
                        })} */}
               
                
            </div>
        )
    }
}

export default Profile;
