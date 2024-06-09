import React, { Component } from "react";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import { CiSettings } from "react-icons/ci";
import { MdNotificationsNone } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import "./index.css";
import Popup from "../Popup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../Login";

class Home extends Component {
  state = { projectAvailable: "loader", showPopUp: false, previousProject: [] };

  componentDidMount() {
    this.projectState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showPopUp !== this.state.showPopUp) {
      this.projectState();
    }
  }

  logoutButtonClicked = () => {
    const previousProject = Cookies.get("projects");
    const { history } = this.props;
    const { replace } = history;
    if (previousProject) {
      Cookies.remove("projects");

      replace("/login");
    } else {
      replace("/login");
    }
  };

  togglePopup = () => {
    this.setState((prevState) => ({ showPopUp: !prevState.showPopUp }));
  };

  projectState = () => {
    const previousProject = Cookies.get("projects");

    if (previousProject === undefined) {
      if (this.state.projectAvailable !== "no") {
        this.setState({ projectAvailable: "no" });
      }
    } else {
      const parsedProjects = JSON.parse(previousProject);
      if (
        this.state.projectAvailable !== "yes" ||
        this.state.previousProject !== parsedProjects
      ) {
        this.setState({
          projectAvailable: "yes",
          previousProject: parsedProjects,
        });
      }
    }
  };

  render() {
    const { projectAvailable, showPopUp, previousProject } = this.state;

    return (
      <div>
        <nav className="home-nav-container">
          <div className="home-logo-container">
            <img
              src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717829664/directright_jvr92f.png"
              alt="home-logo"
              className="home-imgs"
            />
            <h1 style={{ color: "blueviolet" }}>LAMA</h1>
          </div>
          <div style={{ gap: "15px" }}>
            <CiSettings size={"40px"} />
            <MdNotificationsNone size={"40px"} />
            <button
              type="button"
              onClick={this.logoutButtonClicked}
              className="log-out-button"
            >
              <IoIosLogOut size={"40px"} />
            </button>
          </div>
        </nav>

        {showPopUp && <Popup closePopup={this.togglePopup} />}

        {projectAvailable === "loader" && (
          <div className="loader-container">
            <Oval
              height={80}
              width={80}
              color="blueviolet"
              ariaLabel="loading"
            />
          </div>
        )}

        {projectAvailable === "no" && (
          <div className="new-project-container">
            <h1 style={{ color: "blueviolet" }}>Create New Project</h1>
            <img
              src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717853271/Group_16_pinggx.png"
              alt="new-project-img"
              className="new-project-image"
            />
            <p style={{ color: "gray", textAlign: "center" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in
            </p>
            <button className="new-project-button" onClick={this.togglePopup}>
              <FaPlusCircle /> Create New Project
            </button>
          </div>
        )}

        {projectAvailable === "yes" && (
          <div className="project-availability-container">
            <div className="project-avail-navbar">
              <h1 style={{ color: "blueviolet" }}>Projects</h1>
              <button onClick={this.togglePopup} className="new-project-button">
                <FaPlusCircle /> Create New Project
              </button>
            </div>

            <ul className="unordered-list-projects">
              {previousProject.map((project, index) => (
                <li className="projects-list-item" key={index}>
                  <Link className="link-item" to={`/${project}`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div
                        style={{
                          backgroundImage:
                            "linear-gradient(to right,#d3e8da,#ecf2e9)",
                          padding: "25px",
                          borderRadius: "15px",
                        }}
                      >
                        {project[0]}
                      </div>
                      <p>{project}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
