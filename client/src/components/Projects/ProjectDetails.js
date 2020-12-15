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

    const showCorrectLink = () =>
        ( details.owner._id === props.loggedInUser._id) ? (
          <p>Project created by: 
        { details.owner && 
        <Link to="/profile">
        { details.owner && <span> {details.owner.firstName} </span> }
        { details.owner && <span>{details.owner.lastName} </span> }
        </Link>}
         under <span>{details.creativeField}</span></p>
         )
         : (
          <p>Project created by: 
        { details.owner && 
        <Link to={`/profile/${details.owner._id}`}>
        { details.owner && <span> {details.owner.firstName} </span> }
        { details.owner && <span>{details.owner.lastName} </span> }
        </Link>}
         under <span>{details.creativeField}</span></p>
        )
      


    return (
        <div className="project-details-wrapper">
        
          <div className="project-inside">
            <div className="details-header">
              <div>
              <h2 className="details-title">{details.title}</h2>
             
                { details.owner && showCorrectLink() }
                     
              </div>
                 <div> <Link to="/projects"><button className="white-btn">Go Back</button></Link></div>   
             
            </div>
              {details.images && details.images.map((element, index) => {
                return (
                  <div key={index}>
                    <img src={element} width="700" alt="project-imageGoods" />

                  </div>
                )
              })}
              
           
            
            </div>
              
          
           
        </div>
    )
}

export default ProjectDetails;
