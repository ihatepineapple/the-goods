import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import UploadService from "../../../services/upload-services";


const EditProjectForm = (props) => {
    const [ formState, setFormState ] = useState({});
    let projectData = props.match.params.id
    
    const service = new UploadService();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, creativeField, description, heroImage } = formState;
    
        axios
        .put(
            `https://the-goods20.herokuapp.com/api/projects/${projectData}`,
            { title, creativeField, description, heroImage },
            { withCredentials: true }
        )
        .then(() => {
            projectData.getTheProject();
            projectData.history.push("/projects");
        })
        .catch((error) => console.error(error));
      };

    const handleFileUpload = (event) => {
        const uploadData = new FormData();
        uploadData.append("heroImage", event.target.files[0]);
      
        service
          .uploadHero(uploadData)
          .then((response) => {
            setFormState({ ...formState, heroImage: response.cloudinaryUrl });
          })
          .catch((err) => {
            console.log("Error while uploading the file: ", err);
          });
      };
  
    const handleImagesUpload = (event) => {
        
    const fileList = [...event.target.files]
        
    const uploadData = new FormData();
    fileList.forEach((element) => {
        uploadData.append("images", element)
    })}
  
    const getDataFromProject = () => {
        axios
        .get(
            `https://the-goods20.herokuapp.com/api/projects/${projectData}`,
    
        )
        .then((dataFromDB) => {
            console.log(dataFromDB)
            setFormState(dataFromDB.data)
        })
        .catch((error) => console.error(error));
    }

    const deleteProject = () => {
        
        axios
          .delete(`https://the-goods20.herokuapp.com/api/projects/${projectData}`, {
            withCredentials: true,
          })
          .then((results) => {
            props.history.push("/projects");
          })
          .catch((error) => console.error(error));
    };
    
    useEffect(getDataFromProject, [projectData]);

    return (
        <div className="form-wrapper">
            <div className="form-container-wide">
        <h2 className="form-title">Edit Project</h2>
        <Link to="/projects"><button className="white-btn">Go Back</button></Link>
        <form onSubmit={handleFormSubmit}>
          <div className="form-wide-columns">
          <div className="wide-columns">
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
            </div>

            <div className="wide-columns">
                <label htmlFor="coverImage">Cover Image:</label>
                <input
                type="file"
                name="heroImage"
                onChange={handleFileUpload}
                />

                <label htmlFor="images">Images:</label>
                <input
                type="file"
                name="images"
                multiple
                onChange={handleImagesUpload}
                />  

                <div className="final-btn-container"> <button className="black-btn" type="submit">Update Project</button></div>
                <div className="final-delete-container"> <button className="white-btn" onClick={() => deleteProject(formState._id)}>Delete project</button> </div>
            </div>
          </div>

           

        </form>
            
        </div>
        </div>
    )
}


export default EditProjectForm;