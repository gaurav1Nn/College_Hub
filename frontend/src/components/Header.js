import React, { useState, useEffect } from "react";
import { FaGithub, FaHome, FaSignOutAlt, FaBell } from "react-icons/fa";
import { IoCaretDown } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpeg";
import profile from "../assets/vhjkl.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// # all the related to login is written in this file JWT is used for login and logout
const Header = () => {
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found. User might be logged out.');
      }
  
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setUsername(response.data.username); 
      localStorage.setItem('userProfile', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error.message);
  
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        window.location.href = '/login';
      }
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary/90 backdrop-blur-md text-text-primary py-3 px-6 flex justify-between items-center w-full shadow-md sticky top-0 z-50 border-b border-card-border"
    >
      {/* Logo Section */}
      <motion.div 
        className="flex items-center space-x-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <a href="/" className="flex items-center">
          <motion.div
            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-accent shadow-sm"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={logo}
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="ml-3">
            <h1 className="font-poppins text-xl tracking-tight">
              <span className="gradient-text font-semibold">College</span>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="bg-white text-primary px-2 py-0.5 ml-1 rounded shadow-sm font-bold text-sm"
              >
                HUB
              </motion.span>
            </h1>
          </div>
        </a>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="flex-1 max-w-xl mx-auto relative"
        initial={{ opacity: 0, width: "80%" }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.div 
          className="relative flex items-center"
          whileHover={{ boxShadow: "0 0 12px rgba(78, 124, 255, 0.25)" }}
        >
          <IoSearchOutline className="absolute left-3 text-text-muted text-lg" />
          <input
            type="text"
            placeholder="Search for topics, people or resources..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-card-border rounded-full focus:bg-input/80 focus:border-accent/50 transition-colors"
          />
        </motion.div>
      </motion.div>

      {/* Navigation Section */}
      <div className="flex items-center space-x-5">
        {/* Home Button */}
        <motion.button 
          className="flex items-center space-x-2 bg-gradient-to-r from-accent to-accent-light text-white rounded-full px-4 py-2 shadow-sm hover:shadow-accent/30"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <a href="/" className="flex items-center space-x-2">
            <FaHome className="text-sm" />
            <span className="font-medium text-sm">Home</span>
          </a>
        </motion.button>

        {/* Notification Bell */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-input p-2.5 rounded-full border border-card-border relative"
        >
          <FaBell className="text-xl text-text-secondary hover:text-accent transition-colors duration-300" />
          <span className="absolute -top-1 -right-1 bg-secondary-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            2
          </span>
        </motion.div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <motion.button
            className="flex items-center space-x-3 bg-input rounded-full py-1.5 pl-1.5 pr-4 border border-card-border"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileHover={{ boxShadow: "0 0 8px rgba(78, 124, 255, 0.2)" }}
          >
            <motion.img
              whileHover={{ scale: 1.08 }}
              src={profile}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-accent/50"
            />
            <span className="font-medium text-sm text-text-primary">{username || 'User'}</span>
            <motion.div
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoCaretDown className="text-text-secondary text-sm" />
            </motion.div>
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 5, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg overflow-hidden z-50 border border-card-border"
              >
                <div className="p-3 border-b border-card-border">
                  <p className="text-xs text-text-muted">Signed in as</p>
                  <p className="text-text-primary font-medium">{username || 'User'}</p>
                </div>
                
                <div className="py-1">
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-text-secondary hover:text-text-primary hover:bg-input/70 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">Profile</span>
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-4 py-2.5 text-text-secondary hover:text-text-primary hover:bg-input/70 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">Settings</span>
                  </a>
                </div>
                
                <div className="border-t border-card-border">
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255, 82, 82, 0.1)" }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-danger font-medium text-sm transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="h-4 w-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
