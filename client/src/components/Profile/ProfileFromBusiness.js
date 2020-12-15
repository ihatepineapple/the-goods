import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import '../../assets/stylesheets/style.css';


const Profile = (props) => {
    const [profileDetails, setProfileDetails] = useState({});
    const [userProjectList, setUserProjectList] = useState([]);


    const checkUserType = (loggedInUser) => {
      if (loggedInUser.type === "business") {
        return (
          <div className="new-btn-div">
          <button className="black-btn" onClick={() => window.location.href = `mailto:${profileDetails.email}`}>Get in touch</button>
          </div>
        )
      }
    }

    const getProfileDetails = () => {
        const { id }  = props.match.params;
    
        axios
          .get(`https://the-goods20.herokuapp.com/api/profile/${id}`, {
            withCredentials: true,
          })
          .then((responseFromApi) => {
            setProfileDetails(responseFromApi.data);
          })
          .catch((error) => console.error(error));
    };

    useEffect(getProfileDetails, [props.match.params]);

    const getProjectList = () => {
        const id  = profileDetails._id;
    
        axios
          .get(`https://the-goods20.herokuapp.com/api/profile/${id}`, {
            withCredentials: true,
          })
          .then((responseFromApi) => {
            setUserProjectList(responseFromApi.data.projects);
          })
          .catch((error) => console.error(error));
    };

    useEffect(getProjectList, [profileDetails.projects, profileDetails._id]);
   
    if (profileDetails) {
        return (
            <div className="info-wrapper">
                <div className="info-container">
                    <img src={profileDetails.userImg} alt={profileDetails.firstName}/>
                    <h4>{profileDetails.firstName} {profileDetails.lastName}</h4>
                    <p>{profileDetails.creativeFields}</p>
                    <p>Location: {profileDetails.location}</p>
                    <p>{profileDetails.extWeb}</p>
                    <p>{profileDetails.about}</p>
                    {checkUserType(props.loggedInUser)}
                    
                </div> 
              
                <div className="project-container">
                  <div className="project-header">
                    <h3>Project List</h3> 
                  </div>
                  <hr/>
                  <hr/>
                    {(profileDetails.projects && profileDetails.projects.length === 0) ?
                    <p>This user has no projects yet</p>
                    :
                    userProjectList.map((project) => {
                        return (
                            <div>
                              <div key={project._id} className="projects-list">
                                <div className="proj-thumb">
                                  <img src={project.heroImage} alt={project.title} width="400"/>
                                </div>
                                
                                <div className="proj-info">
                                  <Link to={`/projects/${project._id}`}>
                                    <h2>{project.title}</h2>
                                  </Link>
                                    <p>Created under: <span>{project.creativeField}</span></p>
                              
                                </div>
                              </div>
                              <hr/>

                            </div>
                            

                        )
                    })}
                </div>    
            </div>
        )
    }
}

export default Profile;
