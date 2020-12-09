import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectSearch from "./ProjectSearch";

function ProjectList() {
    const [listOfProjects, setListOfProjects] = useState([]);
    const [filteredProjectList, setFilteredProjectListState] = useState([]);
    const [searchState, setSearchState] = useState(false);

    const getAllProjects = () => {
        axios
          .get(`http://localhost:5000/api/projects`, { withCredentials: true })
          .then((responseFromApi) => {
            setListOfProjects(responseFromApi.data);
          })
          .catch((error) => console.error(error));
      };

    useEffect(getAllProjects, []);

    const handleFilterProjects = (searchInput) => {
        const stateCopy = [...listOfProjects];
        const filteredProjectList = stateCopy.filter((projectItem) =>
          projectItem.title.toLowerCase().includes(searchInput.toLowerCase()) || 
          projectItem.owner.toLowerCase().includes(searchInput.toLowerCase()) ||
          projectItem.creativeField.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchState(true);
        setFilteredProjectListState(filteredProjectList);
      };

    return (
        <div>
        <h1>List of Projects</h1>
       <ProjectSearch handleFilterSearch={handleFilterProjects}/>
        <div>
            {searchState ?
                filteredProjectList.map((project) => {
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
            })
            :
            listOfProjects.map((project) => {
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
            })
            }
        </div>
            
        </div>
    )
}

export default ProjectList
