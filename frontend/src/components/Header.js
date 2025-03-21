import React, { useState, useEffect } from "react";
import { FaGithub, FaHome } from "react-icons/fa";
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
      className="bg-gradient-subtle backdrop-blur-md text-text-primary py-3 px-6 flex justify-between items-center w-full shadow-md sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)]"
    >
      {/* Logo Section */}
      <motion.div 
        className="flex items-center space-x-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <a href="/" className="flex items-center">
          <motion.div
            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-accent shadow-accent"
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
          whileHover={{ boxShadow: "0 0 8px rgba(79, 70, 229, 0.25)" }}
        >
          <IoSearchOutline className="absolute left-3 text-text-muted text-lg" />
          <input
            type="text"
            placeholder="Search for topics, people or resources..."
            className="w-full pl-10 pr-4 py-2 bg-secondary/40 border border-[rgba(255,255,255,0.06)] rounded-full focus:bg-secondary/70"
          />
        </motion.div>
      </motion.div>

      {/* Navigation Section */}
      <div className="flex items-center space-x-5">
        {/* Home Button */}
        <motion.button 
          className="flex items-center space-x-2 bg-gradient-primary text-white rounded-full px-4 py-2 shadow-sm hover:shadow-accent"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <a href="/" className="flex items-center space-x-2">
            <FaHome className="text-sm" />
            <span className="font-medium text-sm">Home</span>
          </a>
        </motion.button>

        {/* GitHub Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-secondary/40 p-2.5 rounded-full border border-[rgba(255,255,255,0.06)]"
        >
          <FaGithub className="text-xl text-text-secondary hover:text-accent transition-colors duration-300" />
        </motion.div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <motion.button
            className="flex items-center space-x-3 bg-secondary/40 rounded-full py-1.5 pl-1.5 pr-4 border border-[rgba(255,255,255,0.06)]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileHover={{ boxShadow: "0 0 8px rgba(79, 70, 229, 0.2)" }}
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
                className="absolute right-0 mt-2 w-48 glassmorphism rounded-lg shadow-lg overflow-hidden z-50"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.15)" }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-white/90 hover:text-white font-medium text-sm transition-colors duration-200 border-t border-[rgba(255,255,255,0.03)]"
                  onClick={handleLogout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
