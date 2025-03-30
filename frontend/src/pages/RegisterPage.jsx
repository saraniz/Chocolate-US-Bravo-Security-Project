import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    repass: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
    validateField(id, value);
  };

  const validateField = (field, value) => {
    let errorMsg = "";

    if (field === "username") {
      errorMsg = validateRequired(value);
    } else if (field === "password") {
      errorMsg = validatePassword(value);
    } else if (field === "repass") {
      errorMsg =
        value !== formValues.password
          ? "**Passwords do not match**"
          : validateRequired(value);
    } else if (field === "email") {
      errorMsg = validateEmail(value);
    }

    setErrors({ ...errors, [field]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formValues).forEach((key) => {
      validateField(key, formValues[key]);
      newErrors[key] = errors[key] || validateRequired(formValues[key]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).every((msg) => msg === "")) {
      console.log("Form submitted:", formValues);
    }
  };

  return (
    <div className="log-bag">
      <div className="container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 text-white login-form p-5">
            <h1 className="text-center">SIGN UP</h1>
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  className="form-control mt-2"
                  placeholder="eg: STU2220009"
                  type="text"
                  id="username"
                  value={formValues.username}
                  onChange={handleChange}
                  aria-describedby="usernameError"
                />
                <span className="error text-danger" id="usernameError">
                  {errors.username}
                </span>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control mt-2"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  value={formValues.password}
                  onChange={handleChange}
                  aria-describedby="passwordError"
                />
                <span className="error text-danger" id="passwordError">
                  {errors.password}
                </span>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="repass">Re Password</label>
                <input
                  className="form-control mt-2"
                  placeholder="Re-enter your password"
                  type="password"
                  id="repass"
                  value={formValues.repass}
                  onChange={handleChange}
                  aria-describedby="repassError"
                />
                <span className="error text-danger" id="repassError">
                  {errors.repass}
                </span>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control mt-2"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                  aria-describedby="emailError"
                />
                <span className="error text-danger" id="emailError">
                  {errors.email}
                </span>
              </div>

              <div className="row text-center mt-3">
                <div className="col">
                  <p>Don't have an account?</p>
                </div>
                <div className="col">
                  <Link to="/login">
                    <a href="" className="text-decoration-none text-light">
                      Login
                    </a>
                  </Link>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn w-50 my-2">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Validation functions
export const validateRequired = (value) => {
  return value.trim() !== "" ? "" : "**This field is required**";
};

export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "**Invalid email format**";
};

export const validatePassword = (value) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(value)
    ? ""
    : "**Password must be at least 8 characters, include letters and numbers**";
};

export default RegisterPage;
