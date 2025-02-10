import React, { useState } from 'react';
import logo from "../assets/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// SimpleHeader component (as you had it)
const SimpleHeader = () => {
    return (
        <header className="text-white p-4 flex justify-between items-center fixed top-0 left-0">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-8 rounded-full"
                />
                <h1 className="text-2xl font-bold text-white">
                    College<span className="px-2 py-1 rounded-md">HUB</span>
                </h1>
            </div>
        </header>
    );
};

const topics = [
    'Networking', 'WebDevelopment', 'AppDevelopment', 'SoftwareDevelopment',
    'CompetitiveProgramming', 'Internship', 'CorporateLife', 'Blockchain',
    'Web3', 'MachineLearning', 'ArtificialIntelligence', 'DataAnalytics',
    'CloudComputing', 'Innovation', 'OpenSource'
];

const Register = () => {
    const [emailId, setEmailId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle topic selection (max 3)
    const handleTopicChange = (topic) => {
        if (selectedTopics.includes(topic)) {
            // Remove topic if already selected
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else if (selectedTopics.length < 3) {
            // Add topic if less than 3 selected
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    // Handle registration form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                emailId,
                username,
                password,
                preferences: selectedTopics,
            });

            // Save JWT token in localStorage
            localStorage.setItem("token", response.data.token);

            // Navigate to home page after successful registration
            navigate("/");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Registration failed. Please try again.");
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <>
            <SimpleHeader />
            <div className="flex items-center justify-center min-h-screen bg-[#06141D]">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[30rem]">
                    {/* Register Header */}
                    <h1 className="text-2xl font-semibold text-white text-center mb-6">
                        Register <span className="text-yellow-400">✨</span>
                    </h1>

                    {/* Display Error Message */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email ID"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            className="w-full p-2 mb-4 text-gray-300 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                        />

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 mb-4 text-gray-300 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mb-6 text-gray-300 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-yellow-400"
                        />

                        {/* Topic Selection */}
                        <div className="mb-4 ">
                            <h2 className="text-white mb-2">Select Topics (up to 3):</h2>
                            <div className="flex flex-row flex-wrap gap-2">
                                {topics.map((topic) => (
                                    <button
                                        key={topic}
                                        type="button"
                                        className={`p-1 text-sm rounded ${selectedTopics.includes(topic) ? 'bg-yellow-500' : 'bg-gray-700'} text-white`}
                                        onClick={() => handleTopicChange(topic)}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded focus:outline-none"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-4 text-center text-gray-400">
                        Have an Account?{" "}
                        <span onClick={handleLoginClick} className="text-yellow-400 hover:underline">
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
