import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProfileForm from "./Forms/EditProfileForm"
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

import AuthService from "../../services/auth-services";

const Profile = (props) => {
    // const [loggedInUser, setLoggedInUser] = useState(null);
    const [profileDetails, setProfileDetails] = useState({});
    const [userProjectList, setUserProjectList] = useState([]);

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
    
      console.log(profileDetails.projects)
    

    useEffect(getProfileDetails, [props.loggedInUser._id]);

    const getProjectList = () => {
       
        const id  = props.loggedInUser._id;
    
        axios
          .get(`http://localhost:5000/api/profile/${id}`, {
            withCredentials: true,
          })
          .then((responseFromApi) => {
            setUserProjectList(responseFromApi.data.projects);
          })
          .catch((error) => console.error(error));
    };
    useEffect(getProjectList, [props.loggedInUser._id]);
    console.log(userProjectList)
   
    if (props.loggedInUser) {
        return (
            <div>
            <h1>this is the profile of {profileDetails.firstName}</h1>
                <div className="info-container">
                    <h3>{profileDetails.firstName} {profileDetails.lastName}</h3>
                    <p>{profileDetails.creativeFields}</p>
                    <h5><RoomOutlinedIcon fontSize="small" /><b>Location:</b>{profileDetails.location}</h5>
                    <h5><b>Portfolio:</b>{profileDetails.extWeb}</h5>
                    <p><b>About:</b>{profileDetails.about}</p>
                    <Link to={`/profile/${props.loggedInUser._id}/edit`}>Edit Profile</Link>
                </div> 
                
                    <h4>Project List</h4>
                    {userProjectList.map((project) => {
                        return (
                            <div key={project._id} className="projects-list">
                            <Link to={`/projects/${project._id}`}>
                                <h3>{project.title}</h3>
                            </Link>
                            <img src={project.heroImage} alt={project.title} height="200" />
                            <Link to={`/projects/${project._id}/edit`}> <button>Edit Project</button></Link>
                            </div>

                        );
                    })};
                    <Link to="/projects/create"><button>Add New Project</button></Link>
            </div>
        )
    }
}

export default Profile;
