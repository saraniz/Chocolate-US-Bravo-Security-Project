import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelopeOpen, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  
  return (
    <div className='bg-black text-white px-10 md:px-20'>
      <div className="container-fluid py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          
          <div className="flex flex-col items-start">
            <h1 className="md:text-3xl  font-bold text-chocolate-500 mb-1 md:mb-4">Chocolate Bravo</h1>
            <p className="text-sm font-medium text-neutral-400 md:mb-4">This is not just a company, This is a 'Chocolate Hub'.</p>
          </div>

          <div className="flex flex-col items-start">
            <h5 className="text-lg font-semibold text-chocolate-500 mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <div className='flex md:space-y-2 md:block'>
                <li>
                <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm text-neutral-400 hover:text-chocolate-500 transition duration-300" to="/newest-product">Newest Product</Link>
              </li>
              <div className='md:hidden px-5 text-sm text-neutral-400'>|</div>
              <li>
                <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm text-neutral-400 hover:text-chocolate-500 transition duration-300" to="/">Home</Link>
              </li>
              </div>
              
              <div className='flex md:space-y-2 md:block'>
                <li>
                <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm text-neutral-400 hover:text-chocolate-500 transition duration-300" to="/login">Login/Signup</Link>
              </li>
              <div className='md:hidden px-5 text-sm text-neutral-400'>|</div>
              <li>
                <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm text-neutral-400 hover:text-chocolate-500 transition duration-300" to="/about">About Us</Link>
              </li>
              </div>
              
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h5 className="text-lg font-semibold text-chocolate-500 mb-3">Contact Us</h5>
            <ul className="space-y-1 md:space-y-2">
              <li className="text-sm text-neutral-400">
                <FontAwesomeIcon icon={faPhone} className="mx-2" /> +94770077077
              </li>
              <li className="text-sm text-neutral-400">
                <FontAwesomeIcon icon={faEnvelopeOpen} className="mx-2" /> uschocolate@gmail.com
              </li>
              <li className="text-sm text-neutral-400">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mx-2" /> Colombo, SriLanka
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white p-6 border-t border-neutral-200">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-sm text-neutral-400 mb-4 md:mb-0">All rights reserved &copy; 2024</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-chocolate-500 transition duration-300">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-chocolate-500 transition duration-300">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-chocolate-500 transition duration-300">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          <div className="text-sm text-neutral-400">
            <p>Made with love and chocolate 💖</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
