import React, { useState } from "react";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const ProjectSearch = (props) => {
    
    const handleSearchInput = (event) => {
        let inputValue = event.target.value;
        props.handleFilterSearch(inputValue);
        
    };


    return (
        <input 
        className="input-search"
        name="search" 
        type="text" 
        placeholder="Search here"
        onChange={handleSearchInput}
        
         />
    );
};

export default ProjectSearch;