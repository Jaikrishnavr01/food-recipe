import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ onLogout ,user }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
            <NavLink exact to="/" onClick={toggleMenu}>Home</NavLink>
          </li>
      
          <li>
            <NavLink to="/About" onClick={toggleMenu}>About Us</NavLink>
          </li>
         
          {onLogout && ( <li>
            <NavLink to="/user" onClick={toggleMenu}>Dashboard</NavLink>
          </li> )}
        </ul>
      </div>
      <div className="navbar-right">
      {!onLogout ? (
        <Link to='/user'>
          <button className="btn2">Login</button>
        </Link>
        ):(
          <button className="btn2" onClick={onLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
