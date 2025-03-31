import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import "../index.css"; // Ensure Tailwind is applied

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
     
      <div className="bg-white">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
         
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h2 className="text-3xl font-semibold text-chocolate-500 hover:text-chocolate-700 transition duration-300">
                Chocolate Bravo
              </h2>
            </Link>
          </div>

          
          <div className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300">
              Shop
            </Link>
            <Link to="/categories" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300">
              Categories
            </Link>
            <Link to="/product" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300">
              Product
            </Link>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chocolate-500 w-48 md:w-64"
                placeholder="Search..."
              />
              <button className="absolute right-2 top-2 text-chocolate-500 hover:text-chocolate-600 transition duration-300">
                <i className="fas fa-search"></i>
              </button>
            </div>

            
            <Link to="/login">
              <Button variant="default">
                <i className="fas fa-user-circle mr-2"></i> Login
              </Button>
            </Link>
          </div>

          
          <button
            className="md:hidden text-chocolate-500 hover:text-chocolate-700 transition duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </nav>
      </div>

      
      <hr className="border-neutral-300" />

      
      <div className={`md:hidden bg-white transition-all duration-300 ${menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <nav className="flex flex-col px-4 py-2 space-y-3">
          <Link to="/shop" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300">
            <i className="fas fa-store mr-2"></i> Shop
          </Link>
          <Link to="/categories" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300">
            <i className="fas fa-th-large mr-2"></i> Categories
          </Link>
          <Link to="/product" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300">
            <i className="fas fa-box-open mr-2"></i> Product
          </Link>

          
          <div className="flex flex-col space-y-3 pt-3">
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 w-full border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chocolate-500"
                placeholder="Search..."
              />
              <button className="absolute right-3 top-2 text-chocolate-500 hover:text-chocolate-600">
                <i className="fas fa-search"></i>
              </button>
            </div>

            <Link to="/login" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300 flex items-center">
              <i className="fas fa-user-circle mr-2"></i> Login
            </Link>
          </div>
        </nav>
      </div>

      <hr className="border-muted"/>
    </>
  );
};

export default Header;
