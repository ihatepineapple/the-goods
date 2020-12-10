import React,  { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import UploadService from "../../../services/upload-services";

const initialState = {
    title: "",
    creativeField: "",
    description: "",
    heroImage: "",
    images: [],

}

const AddProjectForm = (props) => {
    const [ formState, setFormState ] = useState(initialState);

    const service = new UploadService();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, creativeField, description, heroImage, images } = formState;
    
        axios
          .post(
            "http://localhost:5000/api/projects",
            { title, creativeField, description, heroImage, images },
            { withCredentials: true }
          )
          .then(() => {
            setFormState(initialState);
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
    })
  
    service
      .uploadImages(uploadData)
      .then((response) => {
        setFormState({ ...formState, images: response.cloudinaryUrl });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

    return (
        <div className="form-wrapper">
          <div className="form-container-wide">
        <h2 className="form-title">Add Project</h2>
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
                name="creativeField"
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

                <div className="final-btn-container">
                  {(formState.heroImage || formState.images) ?
                    <button type="submit" className="black-btn">Upload Project</button>
                    
                    :
                    <button disabled type="submit" className="black-btn">Upload Project</button> }
                  
                </div>
              </div>
          
        </div>


        </form>
            
        </div>
        </div>
    )
}


export default AddProjectForm;