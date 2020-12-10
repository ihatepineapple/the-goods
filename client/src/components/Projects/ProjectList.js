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
        <div >
        {/* <h1>List of Projects</h1> */}
       <ProjectSearch handleFilterSearch={handleFilterProjects}/>
        
            <div className="wrapper-projects">
            {searchState ?
                filteredProjectList.map((project) => {
                return (
                    <div className="projects-container">
                        <div className="project-card" key={project._id}>
                          
                            {/* <h4>{project.creativeField}</h4>
                            <p>{project.description}</p> */}
                            <img src={project.heroImage} alt={project.title} width="400" />
                            <div className="info-card-wrap">
                            <div className="text-card">
                                <h3 className="h3-card" >{project.title}</h3> <br/>
                                <p> Posted under: <b>{project.creativeField}</b></p>
                               </div>
                               <Link to={`/projects/${project._id}`}> <button className="white-btn">See Details</button></Link>
                           </div>

                        </div>
                    </div>  
                )
            })
            :
            listOfProjects.map((project) => {
                return (
                    <div className="card">
                        <div className="project-card" key={project._id}>
                           <img src={project.heroImage} alt={project.title} width="400" />
                           <div className="info-card-wrap">
                               <div className="text-card">
                                <h3 className="h3-card" >{project.title}</h3> <br/>
                                <p> Posted under: <b>{project.creativeField}</b></p>
                               </div>
                               <Link to={`/projects/${project._id}`}> <button className="white-btn">See Details</button></Link>
                           </div>

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
