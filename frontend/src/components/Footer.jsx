import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-white text-black py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* First Column */}
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold text-chocolate-500 mb-4">Chocolate Bravo</h1>
            <p className="text-sm font-medium text-neutral-600 mb-4">This is not just a company, This is a 'Chocolate Hub'.</p>
          </div>

          {/* Second Column - Navigation */}
          <div className="flex flex-col items-start">
            <h5 className="text-lg font-semibold text-chocolate-500 mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li><a className="text-sm text-neutral-700 hover:text-chocolate-500 transition duration-300" href="#">Newest Product</a></li>
              <li><a className="text-sm text-neutral-700 hover:text-chocolate-500 transition duration-300" href="#">Home</a></li>
              <li><a className="text-sm text-neutral-700 hover:text-chocolate-500 transition duration-300" href="#">Login/Signup</a></li>
              <li><a className="text-sm text-neutral-700 hover:text-chocolate-500 transition duration-300" href="#">About Us</a></li>
            </ul>
          </div>

          {/* Third Column - Contact Information */}
          <div className="flex flex-col items-start">
            <h5 className="text-lg font-semibold text-chocolate-500 mb-3">Contact Us</h5>
            <ul className="space-y-2">
              <li className="text-sm text-neutral-700">
                <i className="fa fa-phone mx-2"></i> 01123456
              </li>
              <li className="text-sm text-neutral-700">
                <i className="fa fa-envelope-open mx-2"></i> uschocolate@gmail.com
              </li>
              <li className="text-sm text-neutral-700">
                <i className="fas fa-map-marker-alt mx-2"></i> Magaragama, Colombo, Sri Lanka
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="bg-white text-black py-6 border-t border-neutral-200">
        <div className="container mx-auto text-center">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-neutral-600">All rights reserved &copy; 2024</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-600 hover:text-chocolate-500 transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-chocolate-500 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-chocolate-500 transition duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="text-sm text-neutral-600">
            <p>Made with love and chocolate</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
