import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenmobile, setIsDropdownOpenmobile] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdownmobile = () => setIsDropdownOpenmobile(!isDropdownOpenmobile);
  const closeDropdown = () => setIsDropdownOpen(false);
  const closeDropdownMobile = () => setIsDropdownOpenmobile(false);

  return (
    <>
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="mx-auto md:px-20 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h2 className="text-3xl font-semibold text-chocolate-500 hover:text-chocolate-700 transition duration-300">
                Chocolate Bravo
              </h2>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              { to: "/shop", icon: faStore, label: "Shop" },
              { to: "/favorites", icon: faHeart, label: "Favorites" },
              { to: "/about", icon: faInfoCircle, label: "About Us" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-md transition duration-300 flex items-center ${
                  isActive(to)
                    ? "text-chocolate-500 font-medium"
                    : "text-neutral-700 hover:text-chocolate-500"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="mr-2" />
                {label}
              </Link>
            ))}
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

            <Link
              to="/cart"
              className="text-chocolate-500 hover:text-chocolate-600 px-2 transition duration-300 relative"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-chocolate-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-chocolate-500 hover:text-chocolate-600 font-medium transition cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-xl" />
                  {user.name}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-50">
                    <Link
                      to="/my-orders"
                      onClick={closeDropdown}
                      className="flex items-center px-4 py-2 text-sm hover:bg-neutral-100 text-neutral-700"
                    >
                      <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                      My Orders
                    </Link>
                    <Link
                      to="/settings"
                      onClick={closeDropdown}
                      className="flex items-center px-4 py-2 text-sm hover:bg-neutral-100 text-neutral-700"
                    >
                      <FontAwesomeIcon icon={faCog} className="mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeDropdown();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-neutral-100 text-neutral-700"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default">
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-chocolate-500 hover:text-chocolate-700 transition duration-300"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white transition-all duration-300 ${
          menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col px-4 py-4 space-y-4">
          <div className="flex space-x-5">
            {[
              { to: "/shop", icon: faStore, label: "Shop" },
              { to: "/favorites", icon: faHeart, label: "Favorites" },
              { to: "/about", icon: faInfoCircle, label: "About Us" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`text-lg transition duration-300 flex items-center ${
                  isActive(to)
                    ? "text-chocolate-500 font-medium"
                    : "text-neutral-700 hover:text-chocolate-500"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="mr-2" />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex justify-between items-center space-y-4 pt-4 border-t border-neutral-200">
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 w-[250px] border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chocolate-500"
                placeholder="Search products..."
              />
              <button className="absolute right-3 top-2 text-chocolate-500 hover:text-chocolate-600">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            {user ? (
              <div>
                <button
                  onClick={toggleDropdownmobile}
                  className="flex items-center text-chocolate-500 hover:text-chocolate-600 font-medium transition cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="mb-3 text-3xl" />
                </button>

                {isDropdownOpenmobile && (
                  <div className="absolute bg-black z-40 right-0 p-1 rounded flex flex-col space-y-1 text-white text-lg">
                    <Link to="/orders" onClick={closeDropdownMobile} className="hover:text-chocolate-500">
                      <FontAwesomeIcon icon={faBoxOpen} className="mr-1" /> Orders
                    </Link>
                    <Link to="/settings" onClick={closeDropdownMobile} className="hover:text-chocolate-500">
                      <FontAwesomeIcon icon={faCog} className="mr-1" /> Settings
                    </Link>
                    <Link
                      to="/cart"
                      onClick={closeDropdownMobile}
                      className="text-lg hover:text-chocolate-500 transition duration-300 flex items-center relative"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      Cart
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-chocolate-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeDropdownMobile();
                      }}
                      className="hover:text-chocolate-500 flex items-center"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeDropdownMobile}
                className="text-lg text-neutral-700 hover:text-chocolate-500 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
