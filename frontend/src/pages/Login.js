import React, { useState } from 'react'
import logo from "../assets/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const SimpleHeader = () => {
    return (
        <header className=" text-white p-4 flex justify-between items-center fixed top-0 left-0">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
            <img
                src={logo} // Replace with the actual logo image URL
                alt="Logo"
                className="h-8 rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">
                College
                <span className=" px-2 py-1 rounded-md">HUB</span>
            </h1>
            </div>

        </header>
    )
}
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    // Handle login form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Reset error state
  
      if (!username || !password) {
        setError("Both fields are required.");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          username,
          password,
        });
  
        // JWT token is in response.data.token
        localStorage.setItem("token", response.data.token);
  
        // Navigate to home page after successful Register
        navigate("/");
      } catch (error) {
        // Check if error response is from server
        if (error.response) {
          setError(error.response.data.message || "Registration failed. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }

    };
    
    const handleRegister = async(e) => {
        e.preventDefault();
        navigate('/register')
    }
  
    return (
        <>
        <SimpleHeader />
        <div className="flex items-center justify-center min-h-screen bg-[#06141D]">

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
                {/* Login Header */}
                <h1 className="text-2xl font-semibold text-white text-center mb-6">
                    Login <span className="text-yellow-400">✨</span>
                </h1>

                {/* Display Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-4 text-gray-300 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-yellow-400" />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-6 text-gray-300 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-yellow-400" />

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded focus:outline-none"
                    >
                        Submit
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-4 text-center text-gray-400">
                    Don't have an account?{" "}
                    <span onClick={handleRegister} className="text-yellow-400 hover:underline">
                        Register
                    </span>
                </p>
            </div>
        </div></>
    );
  };

export default Login