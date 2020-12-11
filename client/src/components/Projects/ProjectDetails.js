import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import ProjectList from "./ProjectList";

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
    
    useEffect(getSingleProject, [props.match.params.id]);

    // const deleteProject = () => {
    //     const { id } = props.match.params;
    
    //     axios
    //       .delete(`http://localhost:5000/api/projects/${id}`, {
    //         withCredentials: true,
    //       })
    //       .then((results) => {
    //         props.history.push("/projects");
    //       })
    //       .catch((error) => console.error(error));
    //   };

    //Ownership checked got fucked up bc of async loading, same as details owner (populate)  
    // const ownershipCheck = (project) => {
    //   console.log(props.loggedInUser);
    //   console.log(project.owner);
    //   if (props.loggedInUser._id && project.owner._id === props.loggedInUser._id) {
    //     return (
    //       <div>
    //         <button onClick={() => deleteProject(details._id)}>
    //           Delete project
    //         </button>
    //       </div>
    //       );
    //   }
    // };
    // console.log(details.owner._id)
    // console.log(props.loggedInUser._id)
    // const listImages = [...details.images]
    // console.log(listImages)
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
             
                { details.owner && showCorrectLink()
                  
                  /* {(details.owner._id && details.owner._id === props.loggedInUser._id) ? (
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
                )} */}
              </div>
                 <div> <Link to="/projects"><button className="white-btn">Go Back</button></Link></div>   
                
                {/* {ownershipCheck(details)} */}
              {/* <button onClick={() => deleteProject(details._id)}>Delete project</button> */}
            </div>
              {details.images && details.images.map((element, index) => {
                return (
                  <div key={index}>
                    <img src={element} width="700" />

                  </div>
                )
              })}
              
           
            
            </div>
              
          
           
        </div>
    )
}

export default ProjectDetails;
