import React, { useState, useEffect } from "react";
import { FaGithub, FaHome } from "react-icons/fa"; // Added GitHub Icon
import logo from "../assets/logo.jpeg"; // Your logo file path
import profile from "../assets/vhjkl.jpeg"; // Profile image path
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCaretDown } from "react-icons/io5";

const Header = () => {
  const [username, setUsername] = useState(''); // State to store username
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      // Check if token exists before making the request
      if (!token) {
        throw new Error('No token found. User might be logged out.');
      }
  
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in headers
        },
      });
  
      // Set the username from the response
      setUsername(response.data.username); 
  
      // Save user profile information to local storage
      localStorage.setItem('userProfile', JSON.stringify(response.data)); // Save the entire profile object
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error.message); // Log the error
  
      // Handle unauthorized access
      if (error.response?.status === 401) { // Check for Unauthorized status
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('userProfile'); // Optionally, clear user profile
        // Redirect to login screen (this assumes you are using React Router)
        window.location.href = '/login'; // Replace with your actual login route
      }
    }
  };
  
  // Call the function when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);
  

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token from localStorage
    localStorage.removeItem('userProfile'); // Optionally, remove user profile on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center w-full">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
      <a href="/" className="font-light"><img
          src={logo} // Replace with the actual logo image URL
          alt="Logo"
          className="h-10 rounded-full"
        /></a>
        <h1 className="text-2xl font-bold text-white">
          College
          <span className="bg-white text-gray-700 px-2 py-1 rounded-md">HUB</span>
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-1/3">
        <input
          type="text"
          placeholder="# Explore"
          className="bg-gray-800 outline-none text-white placeholder-gray-400 w-full"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6 gap-4">
        {/* Home Button */}
        <button className="flex items-center space-x-2 bg-white text-blue-500 rounded-full p-2 hover:bg-gray-200">
          <a href="/" className="font-light flex flex-row gap-2">
            <FaHome className="text-xl" />
            <span className="text-black font-bold ">Home</span>
          </a>
        </button>

        {/* GitHub Icon */}
        <FaGithub className="text-3xl cursor-pointer hover:text-blue-400" />

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 bg-gray-800 text-blue-500 rounded-full p-2 cursor-pointer min-w-48"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
          >
            <img
              src={profile} // Replace with the actual profile image URL
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 font-bold pr-4">{username || 'User'}</span> {/* Display username */}

            <IoCaretDown className="absolute text-white right-4" />
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#f00] rounded-md shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#ff4a4a] hover:rounded-md"
                onClick={handleLogout} // Logout button
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
