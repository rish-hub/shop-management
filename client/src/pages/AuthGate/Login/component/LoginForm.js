import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ login, error }) => {
  const [creds, setCreds] = React.useState({ email: "", password: "" });
  const handleChange = (e) => {
    let newCreds = { ...creds };
    newCreds[e.target.name] = e.target.value;
    setCreds(newCreds);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(creds);
  };
  return (
    <div className="w3-container">
      <div
        id="id01"
        className="w3-modal"
        style={{ display: "block", backgroundColor: "rgb(228 223 223 / 40%)" }}
      >
        <div
          className="w3-modal-content w3-card-4"
          style={{ maxWidth: "600px" }}
        >
          <div className="w3-center">
            <br />
            <img
              src="https://www.w3schools.com/w3css/img_avatar4.png"
              alt="Avatar"
              style={{ width: "30%" }}
              className="w3-circle w3-margin-top"
            />
          </div>

          <form onSubmit={handleSubmit} className="w3-container">
            <div className="w3-section">
              <label>
                <b>Email</b>
              </label>
              <input
                className="w3-input w3-border w3-margin-bottom"
                type="text"
                placeholder="Enter Email"
                name="email"
                required
                value={creds.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <label>
                <b>Password</b>
              </label>
              <input
                className="w3-input w3-border"
                type="password"
                placeholder="Enter Password"
                name="password"
                required
                value={creds.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                className="w3-button w3-block w3-green w3-section w3-padding"
                type="submit"
              >
                Login
              </button>{" "}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
          </form>

          <div
            className="w3-container w3-border-top w3-padding-16 w3-light-grey"
            style={{ textAlign: "right" }}
          >
            Create a new account! <Link to="/signup"> Signup </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
