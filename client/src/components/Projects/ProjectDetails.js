import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const ProjectDetails = (props) => {
    const [details, setDetails] = useState({});

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
    

    return (
        <div>
        <h1>this is the details of the project</h1>
            <h2>{details.title}</h2>
            <h3>{details.creativeField}</h3>
            <button onClick={() => deleteProject(details._id)}>Delete project</button>
            <Link to="/projects"><button>Go Back</button></Link>
        </div>
    )
}

export default ProjectDetails;
