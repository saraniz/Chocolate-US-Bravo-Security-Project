import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container-fluid hnav">
        <nav className="navbar navbar-expand-lg">
          <div className="row w-100 align-items-center">
            <div className="col">
              <Link to="/">
                <h2>Chocolate Bravo</h2>
              </Link>
            </div>

            <div className="col d-flex justify-content-center hnav">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a
                      className="hnav text-decoration-none m-3"
                      href="home.html"
                    >
                      Shop
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="hnav text-decoration-none m-3"
                      href="general.html"
                    >
                      Categories
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="hnav text-decoration-none m-3"
                      href="cosmetic.html"
                    >
                      Product
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col d-flex justify-content-end align-items-center">
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search..."
              />
              <a href="#" className="btn">
                <i className="fa fa-search"></i>
              </a>
              <Link to="/login">
                <a href="#" className="ms-3 text-black">
                  <i className="fa fa-user hnav"></i>
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
