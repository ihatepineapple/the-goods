import React,  { useState } from 'react';
import axios from 'axios';

const initialState = {
    title: "",
    creativeField: "",
    description: "",
    heroImage: "",
    // images: "",

}

const AddProjectForm = (props) => {
    const [ formState, setFormState ] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, creativeField, description, heroImage } = formState;
    
        axios
          .post(
            "http://localhost:5000/api/projects",
            { title, creativeField, description, heroImage },
            { withCredentials: true }
          )
          .then(() => {
            // props.getData();
            setFormState(initialState);
          })
          .catch((error) => console.error(error));
      };

    return (
        <div>
        <h1>Add Project</h1>
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
            type="text"
            name="heroImage"
            value={formState.heroImage}
            onChange={handleInputChange}
            />

            <button type="submit">Upload Project</button>


        </form>
            
        </div>
    )
}


export default AddProjectForm;