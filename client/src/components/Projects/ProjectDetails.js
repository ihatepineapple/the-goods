import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectDetails = (props) => {
    const [details, setDetails] = useState({});
  
    
    console.log(details.owner)

    const getSingleProject = () => {
        const { id } = props.match.params;
    
        axios
          .get(`http://localhost:5000/api/projects/${id}`, {
            withCredentials: true,
          })
          .then((responseFromApi) => {
            setDetails(responseFromApi.data);
          })
          .catch((error) => console.error(error));
      };
    
    useEffect(getSingleProject, [props.match.params]);

    const deleteProject = () => {
        const { id } = props.match.params;
    
        axios
          .delete(`http://localhost:5000/api/projects/${id}`, {
            withCredentials: true,
          })
          .then((results) => {
            props.history.push("/projects");
          })
          .catch((error) => console.error(error));
      };

    const ownershipCheck = (project) => {
      if (props.loggedInUser && project.owner._id === props.loggedInUser._id) {
        return (
          <div>
            <button onClick={() => deleteProject(details._id)}>
              Delete project
            </button>
          </div>
          );
      }
    };


    return (
        <div>
        
          <div className="details-header">
            <h2 className="details-title">{details.title}</h2>
              <p>Project created by: 
              { details.owner && <span>{details.owner.firstName} </span> }
              { details.owner && <span>{details.owner.lastName} </span> }
               under <span>{details.creativeField}</span></p>
               {ownershipCheck(details)}
            {/* <button onClick={() => deleteProject(details._id)}>Delete project</button> */}
          </div>
            
          
            <Link to="/projects"><button>Go Back</button></Link>
        </div>
    )
}

export default ProjectDetails;
