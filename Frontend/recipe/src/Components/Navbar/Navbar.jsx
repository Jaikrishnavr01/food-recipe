import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ onLogout, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload();

  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h4>Cook Book</h4>
        {/* <img src="logo.png" alt="Logo" className="logo" /> */}
      </div>
      <div className="navbar-center">
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={`toggle-line ${showMenu ? 'active' : ''}`}></div>
          <div className={`toggle-line ${showMenu ? 'active' : ''}`}></div>
          <div className={`toggle-line ${showMenu ? 'active' : ''}`}></div>
        </div>
        <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
          <li>
            <NavLink exact to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={toggleMenu}>
              About Us
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/dashboard" onClick={toggleMenu}>
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <Link to="/user">
            <button className="btn2">Login</button>
          </Link>
        ) : (
          <button className="btn2" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
