import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStore,
  faHeart,
  faInfoCircle,
  faShoppingCart,
  faBoxOpen,
  faCog,
  faSignOutAlt,
  faDashboard,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const headerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/shop", icon: faStore, label: "Shop" },
    { to: "/favorites", icon: faHeart, label: "Favorites" },
    { to: "/about", icon: faInfoCircle, label: "About Us" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h2 className="text-2xl font-bold text-chocolate-500 hover:text-chocolate-700 transition-colors">
                Chocolate Bravo
              </h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Navigation Links */}
            <nav className="hidden md:flex md:space-x-4 lg:space-x-8">
              {navItems.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-chocolate-500 bg-chocolate-50"
                        : "text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Search Bar - Only visible on larger screens */}
            <div className="hidden lg:block lg:flex-1 lg:max-w-md lg:mx-4">
              <SearchBar />
            </div>

            {/* Cart Icon */}
            <div className="ml-4">
              <Link
                to="/cart"
                className="relative p-2 text-chocolate-500 hover:text-chocolate-600 transition-colors"
                aria-label="View cart"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-chocolate-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </div>

            {/* User Dropdown or Login Button */}
            {user ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-chocolate-500 hover:text-chocolate-600 transition-colors font-medium"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                  <span className="hidden lg:inline">{user.name}</span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                    >
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                        >
                          <FontAwesomeIcon icon={faDashboard} className="w-4 h-4 mr-3" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/my-orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                      >
                        <FontAwesomeIcon icon={faBoxOpen} className="w-4 h-4 mr-3" />
                        My Orders
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                      >
                        <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="ml-4">
                <Button className="bg-black text-white flex items-center space-x-1 px-3 py-1 text-sm ">
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-chocolate-500 hover:text-chocolate-600 mr-2"
              aria-label="View cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-chocolate-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* User Dropdown or Login Button */}
            {user ? (
              <div className="relative mr-2" ref={mobileDropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-chocolate-500 hover:text-chocolate-600 p-2"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                    >
                      <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                        {user.name}
                      </div>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                        >
                          <FontAwesomeIcon icon={faDashboard} className="w-4 h-4 mr-3" />
                          Admin
                        </Link>
                      )}
                      <Link
                        to="/my-orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                      >
                        <FontAwesomeIcon icon={faBoxOpen} className="w-4 h-4 mr-3" />
                        My Orders
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                      >
                        <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="mr-2">
                <Button className="bg-chocolate-500 hover:bg-chocolate-600 text-white p-2">
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 text-chocolate-500 hover:text-chocolate-600"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Search Bar - Visible only in mobile menu */}
              <div className="mb-4">
                <SearchBar />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {navItems.map(({ to, icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                      location.pathname === to
                        ? "text-chocolate-500 bg-chocolate-50"
                        : "text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50"
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Additional mobile-only user actions */}
              {user && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="px-3 py-2 text-sm font-medium text-gray-500">
                    Account
                  </div>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50"
                    >
                      <FontAwesomeIcon icon={faDashboard} className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50"
                  >
                    <FontAwesomeIcon icon={faBoxOpen} className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50"
                  >
                    <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50 text-left"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;