import { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import { FaSpotify, FaFacebook } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import Cookies from "js-cookie";
import "./index.css";

class Project extends Component {
  state = {
    active: "projects",
    showPopUp: false,
    name: "",
    link: "",
    PreviousLinks: [],
    activeTab: "general",
    inputColor1: "",
    inputColor2: "",
  };

  changeActive = () => {
    this.setState({ active: "projects" });
  };

  changeActiveToEdit = () => {
    this.setState({ active: "config" });
  };
  changeActiveToSettings = () => {
    this.setState({ active: "settings" });
  };

  togglePopup = () => {
    this.setState((prevState) => ({ showPopUp: !prevState.showPopUp }));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { match } = this.props;
    const { params } = match;
    const { project } = params;
    const ProjectId = `${project}`;
    const { name, link } = this.state;
    let PreviousLinks = Cookies.get(ProjectId);

    let links = [];

    if (PreviousLinks !== undefined) {
      PreviousLinks = JSON.parse(PreviousLinks);
      links = [...PreviousLinks];
    }

    links.push({ id: uuidv4(), name, link });
    Cookies.set(ProjectId, JSON.stringify(links), { expires: 10 });

    this.setState({
      name: "",
      link: "",
      PreviousLinks: links,
    });

    this.togglePopup();
  };

  inputColorOneChanged = (event) => {
    this.setState({ inputColor1: event.target.value });
  };

  inputColorTwoChanged = (event) => {
    this.setState({ inputColor2: event.target.value });
  };

  deleteLink = (id) => {
    const { match } = this.props;
    const { params } = match;
    const { project } = params;
    const ProjectId = `${project}`;

    let PreviousLinks = Cookies.get(ProjectId);
    if (PreviousLinks) {
      PreviousLinks = JSON.parse(PreviousLinks);
      const updatedLinks = PreviousLinks.filter((link) => link.id !== id);
      Cookies.set(ProjectId, JSON.stringify(updatedLinks), { expires: 10 });
      this.setState({ PreviousLinks: updatedLinks });
    }
  };

  changeActiveTabToGeneral = () => {
    this.setState({ activeTab: "general" });
  };

  changeActiveTabToDisplay = () => {
    this.setState({ activeTab: "display" });
  };

  changeActiveTabToAdvanced = () => {
    this.setState({ activeTab: "advanced" });
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { project } = params;
    const ProjectId = `${project}`;
    const PreviousLinks = Cookies.get(ProjectId);
    if (PreviousLinks) {
      this.setState({ PreviousLinks: JSON.parse(PreviousLinks) });
    }
  }

  renderCommonItems = (value) => {
    const { inputColor1, inputColor2 } = this.state;
    if (value === undefined) {
      return (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div className="input-color-text-container">
              <label>Primary Color</label>
              <input type="text" value={inputColor1} readOnly />
              <input type="color" onChange={this.inputColorOneChanged} />
            </div>

            <div className="input-color-text-container">
              <label>Font Color</label>
              <input type="text" value={inputColor2} readOnly />
              <input type="color" onChange={this.inputColorTwoChanged} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="input-color-text-container">
              <label>Font Size (in px)</label>
              <input type="text" />
            </div>

            <div className="input-color-text-container">
              <label>Chat Height</label>
              <input type="text" />
            </div>
          </div>
          <hr />
          <h1 style={{ color: "blueviolet" }}>Chat Icon</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>Chat Icon Size</p>
              <select className="select-input ">
                <option value="25px">25px</option>
                <option value="45px">45px</option>
                <option value="65px">65px</option>
                <option value="85px">85px</option>
              </select>
            </div>
            <div>
              <p>Position in screen</p>
              <select className="select-input ">
                <option value="bottom right">bottom right</option>
                <option value="bottom left">bottom left</option>
                <option value="top left">top left</option>
                <option value="top right">top right</option>
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p htmlFor="distance-from-bottom">Distance from Bottom (in px)</p>
              <input
                id="distance-from-bottom"
                type="text"
                className="select-input"
              />
            </div>
            <div>
              <p htmlFor="horizontal-distance">Horizontal Distance (in px)</p>
              <input
                id="horizontal-distance"
                type="text"
                className="select-input"
              />
            </div>
          </div>
          <h3 style={{ color: "blueviolet" }}>Chatbot Icon</h3>
          <div>
            <p className="empty-background"> </p>
            <input type="file" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <div className="input-color-text-container">
              <label>Primary Color</label>
              <input type="text" value={inputColor1} readOnly />
              <input type="color" onChange={this.inputColorOneChanged} />
            </div>

            <div className="input-color-text-container">
              <label>Font Color</label>
              <input type="text" value={inputColor2} readOnly />
              <input type="color" onChange={this.inputColorTwoChanged} />
            </div>
          </div>
          <div>
            <div className="input-color-text-container">
              <label>Font Size (in px)</label>
              <input type="text" />
            </div>

            <div className="input-color-text-container">
              <label>Chat Height</label>
              <input type="text" />
            </div>
          </div>
          <hr />
          <h1 style={{ color: "blueviolet" }}>Chat Icon</h1>
          <div>
            <div>
              <p>Chat Icon Size</p>
              <select className="select-input ">
                <option value="25px">25px</option>
                <option value="45px">45px</option>
                <option value="65px">65px</option>
                <option value="85px">85px</option>
              </select>
            </div>
            <div>
              <p>Position in screen</p>
              <select className="select-input ">
                <option value="bottom right">bottom right</option>
                <option value="bottom left">bottom left</option>
                <option value="top left">top left</option>
                <option value="top right">top right</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <p htmlFor="distance-from-bottom">Distance from Bottom (in px)</p>
              <input
                id="distance-from-bottom"
                type="text"
                className="select-input"
              />
            </div>
            <div>
              <p htmlFor="horizontal-distance">Horizontal Distance (in px)</p>
              <input
                id="horizontal-distance"
                type="text"
                className="select-input"
              />
            </div>
          </div>
          <h3 style={{ color: "blueviolet" }}>Chatbot Icon</h3>
          <div>
            <p className="empty-background"> </p>
            <input type="file" />
          </div>
        </div>
      );
    }
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { project } = params;
    let credentials = Cookies.get("credentials");
    const { username_ } = JSON.parse(credentials);
    console.log(username_);
    const { active, showPopUp, name, link, PreviousLinks, activeTab } =
      this.state;

    return (
      <div className="project-container">
        <div className="header-container">
          <div className="home-logo-container">
            <img
              src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717829664/directright_jvr92f.png"
              alt="home-logo"
              className="home-imgs"
            />
            <h1 style={{ color: "blueviolet" }}>LAMA</h1>
          </div>
          <p>Podcast Upload Flow</p>
          <ul className="header-unordered-list">
            <li onClick={this.changeActive}>
              <div
                className={active === "projects" ? "selected" : "unselected"}
              >
                <p
                  className={
                    active === "projects"
                      ? "selected-point"
                      : "unselected-point"
                  }
                >
                  1
                </p>
                <p>Projects</p>
              </div>
            </li>
            <li onClick={this.changeActiveToEdit}>
              <div className={active === "config" ? "selected" : "unselected"}>
                <p
                  className={
                    active === "config" ? "selected-point" : "unselected-point"
                  }
                >
                  2
                </p>
                <p>Widget Configuration</p>
              </div>
            </li>
            <li onClick={this.changeActiveToSettings}>
              <div
                className={active === "settings" ? "selected" : "unselected"}
              >
                <p
                  className={
                    active === "settings"
                      ? "selected-point"
                      : "unselected-point"
                  }
                >
                  <CiSettings />
                </p>
                <p>Settings</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="project-right-container">
          <Link to="/" className="link-back-to-home">
            <IoChevronBackSharp size={"20px"} />
            <p>Back To Home</p>
          </Link>
          {active === "projects" && (
            <>
              <h1 style={{ color: "blueviolet" }}>{project}</h1>
              <div>
                <ul className="unordered-list-upload-options">
                  <li
                    className="upload-options-list-item"
                    onClick={this.togglePopup}
                  >
                    <IoLogoYoutube color={"red"} size={"40px"} />
                    <p>Upload from YouTube</p>
                  </li>
                  <li
                    className="upload-options-list-item"
                    onClick={this.togglePopup}
                  >
                    <FaSpotify color={"#03fc4e"} size={"40px"} />
                    <p>Upload from Spotify</p>
                  </li>
                  <li
                    className="upload-options-list-item"
                    onClick={this.togglePopup}
                  >
                    <FaFacebook color={"#0373fc"} size={"40px"} />
                    <p>Upload from Facebook</p>
                  </li>
                </ul>

                {PreviousLinks.length > 0 && (
                  <ul>
                    <li className="links-list-item">
                      <p>Name</p>
                      <p>Status</p>
                      <p>Action</p>
                    </li>
                    {PreviousLinks.map((eachLink) => (
                      <li
                        key={eachLink.id}
                        className="links-list-item no-top-radius"
                      >
                        <p>{eachLink.name}</p>
                        <p>Uploaded</p>
                        <p>
                          <button
                            className="delete-button"
                            onClick={() => this.deleteLink(eachLink.id)}
                          >
                            Delete
                          </button>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
          {active === "config" && (
            <>
              <div>
                <h1 style={{ color: "blueviolet" }}>Configuration</h1>
                <ul className="button-unordered-list">
                  <li>
                    <button
                      className={
                        activeTab === "general"
                          ? "button-tab active-tab"
                          : "button-tab"
                      }
                      onClick={this.changeActiveTabToGeneral}
                    >
                      General
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={this.changeActiveTabToDisplay}
                      className={
                        activeTab === "display"
                          ? "button-tab active-tab"
                          : "button-tab"
                      }
                    >
                      Display
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={this.changeActiveTabToAdvanced}
                      className={
                        activeTab === "advanced"
                          ? "button-tab active-tab"
                          : "button-tab"
                      }
                    >
                      Advanced
                    </button>
                  </li>
                </ul>
                {activeTab === "general" && (
                  <div>
                    <form>
                      <label htmlFor="chatbot-name">Chatbot Name</label>
                      <input
                        className="input-element-general"
                        id="chatbot-name"
                        type="text"
                      />
                      <label htmlFor="welcome-message">Welcome Message</label>
                      <input
                        className="input-element-general"
                        id="welcome-message"
                        type="text"
                      />
                      <label htmlFor="input-placeholder">
                        Input Placeholder
                      </label>
                      <input
                        className="input-element-general"
                        id="input-placeholder"
                        type="text"
                      />
                    </form>
                  </div>
                )}
                {activeTab === "display" && (
                  <div>{this.renderCommonItems()}</div>
                )}
                {activeTab === "advanced" && (
                  <div>{this.renderCommonItems(true)}</div>
                )}
              </div>
            </>
          )}
          {active === "settings" && (
            <>
              <p>Hello!</p>
              <h1 style={{ color: "blueviolet" }}>Account Settings</h1>
              <div
                style={{ display: "flex", alignItems: "center", gap: "70px" }}
              >
                <img
                  src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717938446/images_rzvgnf.png"
                  className="profile-picture"
                  alt="profile-picture"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="email">EMAIL</label>
                  <input id="email" value={username_} type="text" />
                </div>
              </div>
              <h1 style={{ color: "blueviolet" }}>Subcriptions</h1>
              <div className="subscription-container">
                <p>You are currently on the Ques AI Pro Plan!</p>
              </div>
              <p
                style={{
                  color: "red",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Cancel Subscription
              </p>
            </>
          )}

          {showPopUp && (
            <div className="popup-container">
              <div className="popup-content">
                <button
                  onClick={this.togglePopup}
                  className="popup-close-button"
                >
                  X
                </button>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Link:</label>
                    <input
                      type="text"
                      name="link"
                      value={link}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Project;
