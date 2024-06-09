import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = {
    login: true,
    showPassword: false,
    showMessage: false,
    username: "",
    password: "",
    reenterPassword: "",
    passwordMismatch: "",
  };

  showPasswordTriggered = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  registerFormSubmitted = (event) => {
    event.preventDefault();
    const { username, password, reenterPassword } = this.state;
    if (password !== reenterPassword) {
      this.setState({ passwordMismatch: true });
    } else {
      const credentials = { username_: username, password_: password };
      console.log(username, password);
      Cookies.set("credentials", JSON.stringify(credentials));
      this.setState({ login: true, password: "", username: "" });
    }
  };

  changeTologin = () => {
    this.setState({ login: true });
  };

  changeToRegister = () => {
    this.setState({ login: false });
  };

  loginFormSubmitted = (event) => {
    event.preventDefault();
    const credentials = Cookies.get("credentials");
    const { username, password } = this.state;

    let username_ = "";
    let password_ = "";

    if (credentials) {
      const parsedCredentials = JSON.parse(credentials);
      username_ = parsedCredentials.username_;
      password_ = parsedCredentials.password_;
    }

    if (username !== username_ || password !== password_) {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
      const { history } = this.props;
      const { replace } = history;
      replace("/");
    }
  };

  passwordChanged = (event) => {
    this.setState({ password: event.target.value, showMessage: false });
  };

  usernameChanged = (event) => {
    this.setState({ username: event.target.value, showMessage: false });
  };

  reenterPasswordChanged = (event) => {
    this.setState({
      reenterPassword: event.target.value,
      passwordMismatch: false,
    });
  };

  render() {
    const {
      login,
      showPassword,
      showMessage,
      username,
      password,
      passwordMismatch,
      reenterPassword,
    } = this.state;
    return (
      <div>
        <div className="login-main-container">
          <div className="login-left-container">
            <nav className="login-logo">
              <img
                alt="login-logo"
                src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717829664/directright_jvr92f.png"
              />
              <h1>LAMA</h1>
            </nav>

            <h1 className="login-heading">
              Your podcast will no longer be just a hobby.
            </h1>
            <div className="login-para-description">
              <p className="login-description" style={{ color: "black" }}>
                Supercharge Your Distribution using our assistant!
              </p>
              <p>Without music, life would be a mistake.</p>
              <p style={{ marginLeft: "40px" }}> - Friedrich Nietzsche</p>
            </div>
          </div>
          <div className="login-right-container">
            {login && (
              <form
                onSubmit={this.loginFormSubmitted}
                className="form-container"
              >
                <img
                  src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717829664/directright_jvr92f.png"
                  alt="login-form-logo "
                  className="logo-img"
                />
                <h1>Welcome to LAMA</h1>
                <div className="form-input-container">
                  <label
                    htmlFor="email-input"
                    style={{ alignSelf: "flex-start" }}
                  >
                    EMAIL
                  </label>
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Enter Your Mail ID"
                    id="email-input"
                    value={username}
                    onChange={this.usernameChanged}
                  />
                  <label
                    htmlFor="password-input"
                    style={{ alignSelf: "flex-start", marginTop: "20px" }}
                  >
                    PASSWORD
                  </label>
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    className="login-input"
                    placeholder="Enter The Password"
                    value={password}
                    onChange={this.passwordChanged}
                  />
                  <div className="show-password-container">
                    <input
                      id="show-password"
                      type="checkbox"
                      onChange={this.showPasswordTriggered}
                    />
                    <label htmlFor="show-password">Show Password</label>
                  </div>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showMessage && (
                  <p style={{ color: "red" }}>Invalid Credentials!</p>
                )}
                <p>
                  Not Registered?{" "}
                  <a
                    href="#"
                    onClick={this.changeToRegister}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "skyblue", fontWeight: "bold" }}>
                      Create New Account
                    </span>
                  </a>
                </p>
              </form>
            )}
            {!login && (
              <form
                onSubmit={this.registerFormSubmitted}
                className="form-container"
              >
                <img
                  src="https://res.cloudinary.com/djfbwkdh3/image/upload/v1717829664/directright_jvr92f.png"
                  alt="login-form-logo "
                  className="logo-img"
                />
                <h1>Welcome to LAMA</h1>
                <div className="form-input-container">
                  <label
                    htmlFor="email-input"
                    style={{ alignSelf: "flex-start" }}
                  >
                    EMAIL
                  </label>
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Enter Your Mail ID"
                    id="email-input"
                    value={username}
                    onChange={this.usernameChanged}
                  />
                  <label
                    htmlFor="password-input"
                    style={{ alignSelf: "flex-start", marginTop: "20px" }}
                  >
                    PASSWORD
                  </label>
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    className="login-input"
                    placeholder="Enter The Password"
                    value={password}
                    onChange={this.passwordChanged}
                  />
                  <label htmlFor="password-reenter-input">
                    {" "}
                    REENTER PASSWORD
                  </label>
                  <input
                    id="password-reenter-input"
                    type={showPassword ? "text" : "password"}
                    className="login-input"
                    placeholder="Enter The Password"
                    value={reenterPassword}
                    onChange={this.reenterPasswordChanged}
                  />
                  <div className="show-password-container">
                    <input
                      id="show-password"
                      type="checkbox"
                      onChange={this.showPasswordTriggered}
                    />
                    <label htmlFor="show-password">Show Password</label>
                  </div>
                </div>
                <button type="submit" className="login-button">
                  Register
                </button>
                {passwordMismatch && (
                  <p style={{ color: "red" }}> Password Mismatch !</p>
                )}
                <p>
                  Already Registered?{" "}
                  <a
                    href="#"
                    style={{ textDecoration: "none" }}
                    onClick={this.changeTologin}
                  >
                    <span style={{ color: "skyblue", fontWeight: "bold" }}>
                      Login
                    </span>
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
