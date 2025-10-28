import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../Assets/greenlogo.svg"; 

const Navbar = () => {
  const [glass, setGlass] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const onScroll = () => {
      setGlass(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-menu')) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className={`navbar-root ${glass ? "navbar-glass" : ""}`}>
      <nav className="navbar-content">
        <div className="navbar-brand">
          <span className="navbar-logo">
            <img src={logo} alt="Navbar-logo" />
          </span>
          <span className="navbar-brandname">Swasthya Setu</span>
        </div>
        <ul className={`navbar-links ${showMobileMenu ? 'mobile-open' : ''}`} ref={mobileMenuRef}>
          <li><Link to="/" className="nav-link" onClick={() => setShowMobileMenu(false)}>Home</Link></li>
          <li><Link to="/features" className="nav-link" onClick={() => setShowMobileMenu(false)}>Features</Link></li>
          <li><Link to="/todo-manager" className="nav-link" onClick={() => setShowMobileMenu(false)}>Todo Manager</Link></li>
          <li><Link to="/resources" className="nav-link" onClick={() => setShowMobileMenu(false)}>Resources</Link></li>
          <li><Link to="/about" className="nav-link" onClick={() => setShowMobileMenu(false)}>About Us</Link></li>
        </ul>
        <div className="navbar-right">
          {!user && (
            <>
              <span className="navbar-signin"><Link to="/signup" className="nav-link">Sign Up</Link></span>
              <button className="navbar-cta" onClick={() => navigate('/login')}>Get Started</button>
            </>
          )}
          {user && (
            <div className="navbar-user" ref={dropdownRef}>
              <span
                className="navbar-username"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name}
                <ArrowDropDownIcon style={{ fontSize: "20px", marginLeft: "4px" }} />
              </span>

              {showDropdown && (
                <div className="navbar-dropdown">
                  <Link to="/profile" className="dropdown-link" onClick={() => setShowDropdown(false)}><AccountCircleIcon/> Profile</Link>
                  <button className="dropdown-link logout-btn" onClick={handleLogout}><LogoutIcon/> Logout</button>
                </div>
              )}
            </div>
          )}
          <button className="hamburger-menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
