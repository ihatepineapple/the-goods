import React,  { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



const EditProfileForm = (props) => {
    const [ formState, setFormState ] = useState(props.loggedInUser);
    let profileData = props.match.params.id;
    console.log(profileData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, creativeFields, location, extWeb, userImg, about } = formState;
    
        axios
          .put(
            `http://localhost:5000/api/profile/${profileData}`,
            { firstName, lastName, creativeFields, location, extWeb, userImg, about },
            { withCredentials: true }
          )
          .then(() => {
            // profileData.getTheProject();
            props.history.push(`/profile`);
        })
          .catch((error) => console.error(error));
      };

    return (
      <div className="form-wrapper">
        <div className="form-container-wide">
          <h2 className="form-title">Edit your profile</h2>
          <p>Complete your profle to gain more visibility</p>
          <Link to={`/profile/${profileData}`} ><button>Go Back</button></Link>
          <form onSubmit={handleFormSubmit}>
              <div className="form-wide-columns">
              <div className="wide-columns">
                <label htmlFor="firstName">First name:</label>
                <input
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                />

                <label htmlFor="lastName">Last name:</label>
                <input
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
                />

                <label htmlFor="creativeFields">Creative Expertise:</label>
                <input
                name="creativeFields"
                value={formState.creativeFields}
                onChange={handleInputChange}
                />

                <label htmlFor="locations">Location:</label>
                <input
                name="location"
                value={formState.location}
                onChange={handleInputChange}
                />
              </div>

              <div className="wide-columns">
                <label htmlFor="extWeb">External Portfolio:</label>
                <input
                name="extWeb"
                value={formState.extWeb}
                onChange={handleInputChange}
                />

                <label htmlFor="userImg">Profile Image:</label>
                <input
                type="file"
                name="userImg"
                onChange={handleInputChange}
                />

                <label htmlFor="about">About you:</label>
                <textarea
                type="text"
                name="about"
                value={formState.about}
                onChange={handleInputChange}
                />

                <div><button className="black-btn" type="submit">Update Profile</button></div>
              </div>
              </div>

          
          </form>
            
        </div>
      </div>
    )
}


export default EditProfileForm;