import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



const EditProjectForm = (props) => {
    const [ formState, setFormState ] = useState({});
    let projectData = props.match.params.id
    console.log(projectData)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, creativeField, description, heroImage } = formState;
    
        axios
        .put(
            `http://localhost:5000/api/projects/${projectData}`,
            { title, creativeField, description, heroImage },
            { withCredentials: true }
        )
        .then(() => {
            projectData.getTheProject();
            projectData.history.push("/projects");
        })
        .catch((error) => console.error(error));
      };
      
    const getDataFromProject = () => {
        axios
        .get(
            `http://localhost:5000/api/projects/${projectData}`,
    
        )
        .then((dataFromDB) => {
            console.log(dataFromDB)
            setFormState(dataFromDB.data)
        })
        .catch((error) => console.error(error));
    }

    const deleteProject = () => {
        
        axios
          .delete(`http://localhost:5000/api/projects/${projectData}`, {
            withCredentials: true,
          })
          .then((results) => {
            props.history.push("/projects");
          })
          .catch((error) => console.error(error));
    };
    
    useEffect(getDataFromProject, [projectData]);

    return (
        <div>
        <h1>Edit Project</h1>
        <Link to="/projects"><button>Go Back</button></Link>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title:</label>
            <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            />

            <label htmlFor="creativeField">Creative Field:</label>
            <input
            type="text"
            name="title"
            value={formState.creativeField}
            onChange={handleInputChange}
            />

            <label htmlFor="Description">Description:</label>
            <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            />

            <label htmlFor="coverImage">Cover Image:</label>
            <input
            type="file"
            name="heroImage"
            onChange={handleInputChange}
            />

            <label htmlFor="images">Images:</label>
            <input
            type="file"
            name="images"
            multiple
            onChange={handleInputChange}
            />  

            <button type="submit">Update Project</button>
            <button onClick={() => deleteProject(formState._id)}>Delete project</button>

        </form>
            
        </div>
    )
}


export default EditProjectForm;