import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from '../components/Button';
import {
  validateRequired,
  validatePassword,
} from '../utils/validation'; 

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "username") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: validateRequired(value),
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = validateRequired(formValues.username);
    const passwordError = validatePassword(formValues.password);

    setErrors({
      username: usernameError,
      password: passwordError,
    });


    if (usernameError || passwordError) {
      return;
    }

    console.log("Logged in with", formValues.username);
  };

  return (
    <div className="bg-white">
      <div className="container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 text-white login-form p-5">
            <h1 className="text-center">LOG IN</h1>

            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  className={`form-control mt-2 ${errors.username ? "is-invalid" : ""}`}
                  placeholder="eg: STU2220009"
                  type="text"
                  name="username"
                  id="username"
                  value={formValues.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <span className="error text-white">{errors.username}</span>
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                  className={`form-control mt-2 ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  id="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error text-white">{errors.password}</span>
                )}
              </div>

              <div className="row text-center mt-3">
                <div className="col">
                  <p>Don't have an account?</p>
                </div>
                <div className="col">
                  <a href="#" className="text-decoration-none text-light">
                    Sign Up
                  </a>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <Button placeholder="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
