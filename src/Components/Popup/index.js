import React, { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Popup = ({ message, closePopup, handleSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let existingProject = Cookies.get("projects");
    if (existingProject === undefined) {
      existingProject = [];
    } else {
      existingProject = JSON.parse(existingProject);
    }
    const addedProject = inputValue;
    const newProject = [...existingProject, addedProject];
    Cookies.set("projects", JSON.stringify(newProject));
    console.log(newProject);
    closePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-button" onClick={closePopup}>
          &times;
        </span>
        <h1>Create Project</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="project-title">Project Title</label>
          <input
            id="project-title"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter some text"
            className="popup-input"
          />
          <button type="submit" className="popup-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
