import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faBars,
  faStore,
  faHeart,
  faInfoCircle,
  faShoppingCart,
  faBoxOpen,
  faCog,
  faSignOutAlt,
  faDashboard,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from './SearchBar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdownMobile = () => setIsDropdownOpenMobile(!isDropdownOpenMobile);
  const closeDropdown = () => setIsDropdownOpen(false);
  const closeDropdownMobile = () => setIsDropdownOpenMobile(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsDropdownOpenMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset states on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsDropdownOpenMobile(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/shop", icon: faStore, label: "Shop" },
    { to: "/favorites", icon: faHeart, label: "Favorites" },
    { to: "/about", icon: faInfoCircle, label: "About Us" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-chocolate-500 hover:text-chocolate-700 transition duration-300">
              Chocolate Bravo
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
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
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-chocolate-500 hover:text-chocolate-600 transition-colors duration-200"
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

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-chocolate-500 hover:text-chocolate-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                  <span className="font-medium">{user.name}</span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                    >
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={closeDropdown}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faDashboard} className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/my-orders"
                        onClick={closeDropdown}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faBoxOpen} className="w-4 h-4 mr-2" />
                        My Orders
                      </Link>
                      <Link
                        to="/settings"
                        onClick={closeDropdown}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-chocolate-500 hover:bg-chocolate-600 text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-chocolate-500 hover:text-chocolate-600 transition-colors duration-200"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navItems.map(({ to, icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(to)
                        ? "text-chocolate-500 bg-chocolate-50"
                        : "text-gray-700 hover:text-chocolate-500 hover:bg-chocolate-50"
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <SearchBar className="mb-4" />
              </div>

              {/* Mobile User Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Link
                  to="/cart"
                  className="relative p-2 text-chocolate-500 hover:text-chocolate-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
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

                {user ? (
                  <div className="relative" ref={mobileDropdownRef}>
                    <button
                      onClick={toggleDropdownMobile}
                      className="flex items-center space-x-2 text-chocolate-500 hover:text-chocolate-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faUser} className="text-2xl" />
                      <span className="font-medium">{user.name}</span>
                    </button>

                    <AnimatePresence>
                      {isDropdownOpenMobile && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                        >
                          {user.isAdmin && (
                            <Link
                              to="/admin"
                              onClick={closeDropdownMobile}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faDashboard} className="w-4 h-4 mr-2" />
                              Admin Dashboard
                            </Link>
                          )}
                          <Link
                            to="/my-orders"
                            onClick={closeDropdownMobile}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                          >
                            <FontAwesomeIcon icon={faBoxOpen} className="w-4 h-4 mr-2" />
                            My Orders
                          </Link>
                          <Link
                            to="/settings"
                            onClick={closeDropdownMobile}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                          >
                            <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-2" />
                            Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-chocolate-50 hover:text-chocolate-500 transition-colors duration-200"
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="bg-chocolate-500 hover:bg-chocolate-600 text-white transition-colors duration-200">
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
