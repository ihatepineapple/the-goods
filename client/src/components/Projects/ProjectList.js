import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function ProjectList() {
    const [listOfProjects, setListOfProjects] = useState([]);

    const getAllProjects = () => {
        axios
          .get(`http://localhost:5000/api/projects`, { withCredentials: true })
          .then((responseFromApi) => {
            setListOfProjects(responseFromApi.data);
          })
          .catch((error) => console.error(error));
      };

    useEffect(getAllProjects, []);

    return (
        <div>
        <h1>List of Projects</h1>
       
        <Link to="/projects/create"><button>Add New Project</button></Link>
        <div>
            {listOfProjects.map((project) => {
                return (
                    <div >
                        <div key={project._id}>
                           <Link to={`/projects/${project._id}`}> <h3>{project.title}</h3></Link>
                            <h4>{project.creativeField}</h4>
                            <p>{project.description}</p>
                            <img src={project.heroImage} alt={project.title} height="200" />

                        </div>
                        
                    </div>  
                )

            })}
        </div>
            
        </div>
    )
}

export default ProjectList
