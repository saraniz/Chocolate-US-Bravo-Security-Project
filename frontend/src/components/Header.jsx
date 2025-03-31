import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Ensure Tailwind is applied
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <div className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h2 className="text-3xl font-semibold text-chocolate-500 hover:text-chocolate-700 transition duration-300">
                Chocolate Bravo
              </h2>
            </Link>
          </div>

          {/* Navbar Links */}
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

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chocolate-500 w-48 md:w-64"
              placeholder="Search..."
            />
            <button className="p-2 bg-chocolate-500 text-white rounded-full hover:bg-chocolate-600 transition duration-300">
              <i className="fa fa-search"></i>
            </button>

            {/* User Login Icon */}
            <Link to="/login">
              <Button variant="default">
                Login
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <h2 className="text-2xl font-semibold text-chocolate-500 hover:text-chocolate-700 transition duration-300">
                Chocolate Bravo
              </h2>
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex items-center">
            <button className="text-neutral-700 hover:text-chocolate-500 transition duration-300">
              <i className="fa fa-bars text-xl"></i>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
