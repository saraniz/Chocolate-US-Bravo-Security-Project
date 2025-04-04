import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle, faBars, faStore, faHeart, faInfoCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from '../context/CartContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h2 className="text-3xl font-semibold text-chocolate-500 hover:text-chocolate-700 transition duration-300">
                Chocolate Bravo
              </h2>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link 
              to="/shop" 
              className={`text-md transition duration-300 flex justify-center items-center ${
                isActive('/shop') 
                  ? 'text-chocolate-500 font-medium' 
                  : 'text-neutral-700 hover:text-chocolate-500'
              }`}
            >
              <FontAwesomeIcon icon={faStore} className="mr-2" /> Shop
            </Link>
            <Link 
              to="/favorites" 
              className={`text-md transition duration-300 flex items-center ${
                isActive('/favorites') 
                  ? 'text-chocolate-500 font-medium' 
                  : 'text-neutral-700 hover:text-chocolate-500'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" /> Favorites
            </Link>
            <Link 
              to="/about" 
              className={`text-md transition duration-300 flex items-center ${
                isActive('/about') 
                  ? 'text-chocolate-500 font-medium' 
                  : 'text-neutral-700 hover:text-chocolate-500'
              }`}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About Us
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chocolate-500 w-48 md:w-64"
                placeholder="Search products..."
              />
              <button className="absolute right-2 top-2 text-chocolate-500 hover:text-chocolate-600 transition duration-300">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <Link to="/cart" className="text-chocolate-500 hover:text-chocolate-600 px-2 transition duration-300 relative">
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-chocolate-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login">
              <Button variant="default" className="">
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Login
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-chocolate-500 hover:text-chocolate-700 transition duration-300"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </nav>
      </div>

      <div className={`md:hidden bg-white transition-all duration-300 ${menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <nav className="flex flex-col px-4 py-4 space-y-4">
          <Link 
            to="/shop" 
            className={`text-lg transition duration-300 flex items-center ${
              isActive('/shop') 
                ? 'text-chocolate-500 font-medium' 
                : 'text-neutral-700 hover:text-chocolate-500'
            }`}
          >
            <FontAwesomeIcon icon={faStore} className="mr-2" /> Shop
          </Link>
          <Link 
            to="/favorites" 
            className={`text-lg transition duration-300 flex items-center ${
              isActive('/favorites') 
                ? 'text-chocolate-500 font-medium' 
                : 'text-neutral-700 hover:text-chocolate-500'
            }`}
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2" /> Favorites
          </Link>
          <Link 
            to="/about" 
            className={`text-lg transition duration-300 flex items-center ${
              isActive('/about') 
                ? 'text-chocolate-500 font-medium' 
                : 'text-neutral-700 hover:text-chocolate-500'
            }`}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About Us
          </Link>

          <div className="flex flex-col space-y-4 pt-4 border-t border-neutral-200">
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 w-full border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chocolate-500"
                placeholder="Search products..."
              />
              <button className="absolute right-3 top-2 text-chocolate-500 hover:text-chocolate-600">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <Link to="/cart" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300 flex items-center relative">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-chocolate-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link to="/login" className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300 flex items-center">
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Login
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;