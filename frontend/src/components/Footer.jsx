import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'




const Footer = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row choco5">
          <div className="col mt-5 hnav">
            <h1>Chocolate Bravo</h1>
            <h5 className="position-absolute">This is not just a company<br />this is a 'Chocolate Gub'</h5>
            <div><img className="img5" src='src\img\Milk2.png' alt="Milk Chocolate" /></div>
          </div>
          <div className="col mt-5">
            <ul className="navbar-nav">
              <li className=""><a className="text-decoration-none nav-link l1" href="#">Newest Product</a></li>
              <li className=""><a className="text-decoration-none nav-link l1" href="#">Home</a></li>
              <li className=""><a className="text-decoration-none nav-link l1" href="#">Login/Signup</a></li>
              <li className=""><a className="text-decoration-none nav-link l1" href="#">About Us</a></li>
            </ul>
          </div>
          <div className="col mt-5">
            <ul className="navbar-nav">
              <p className='border-bottom border-2'>Contact Us</p>
              <li className="nav-link"><i class="fa fa-phone mx-1 hnav"></i>01123456</li>
              <li className="nav-link"><i class="fa fa-envelope-open mx-1 hnav"></i>uschocolate@gmail.com</li>
              <li className="nav-link"><i class="fas fa-map-marker-alt mx-1 hnav"></i>Magaragama, colombo, srilanka.</li>
            </ul>
          </div>
          <div className="col">
          <img className="img4" src="src\img\Milk splash.png" alt="Milk Splash" />

          </div>
        </div>
      </div>

    
    <footer className="text-center justify-content-center align-items-center py-2 bg-light">
  <div className="container">
    <div className="row">
      <div className="col">
        <p className="mb-0 hnav">All rights reserved &copy; 2024</p>
      </div>
      <div className="col d-flex justify-content-center">
        <ul className="list-unstyled d-flex">
          <li className="nav-link mx-2">
            <a href=""><i class="fab fa-facebook-f hnav"></i></a>
          </li>
          <li className="nav-link mx-2">
            <a href=""><i class="fab fa-instagram hnav"></i></a>
          </li>
          <li className="nav-link mx-2">
            <a href=""><i class="fab fa-youtube hnav"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer
