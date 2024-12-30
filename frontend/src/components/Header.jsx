import React from 'react'

const Header = () => {
  return (
    <>
        <div className="container-fluid hnav">
        <nav className="navbar navbar-expand-lg">
          <div className="row w-100 align-items-center">
            <div className="col">
              <h2>Chocolate Bravo</h2>
            </div>

            <div className="col d-flex justify-content-center hnav">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="hnav text-decoration-none m-3" href="home.html">Shop</a>
                  </li>
                  <li className="nav-item">
                    <a className="hnav text-decoration-none m-3" href="general.html">Categories</a>
                  </li>
                  <li className="nav-item">
                    <a className="hnav text-decoration-none m-3" href="cosmetic.html">Product</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col d-flex justify-content-end align-items-center">
              <input type="text" className="form-control w-50" placeholder="Search..." />
              <a href="#" className="btn btn-outline-secondary">
                <i className="fa fa-search"></i>
              </a>
              <a href="#" className="ms-3 text-black">
                <i className="fa fa-user hnav"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
