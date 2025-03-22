import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import Header from '../components/Header';
import { FaUserFriends, FaCommentAlt, FaBook, FaClock, FaFilter, FaTag, FaThumbsUp, FaComment } from "react-icons/fa";
import DiscussionModal from '../components/DiscussionModal';
import DiscussionDetails from '../components/DiscussionDetails';

const DiscussionPage = () => {
    const [discussions, setDiscussions] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [popularTopics] = useState([
        "Dynamic Programming",
        "Graph Algorithms",
        "Number Theory",
        "String Algorithms",
        "Data Structures"
    ]);
    const [upcomingContests] = useState([
        { name: "CodeForces Round #890", platform: "CodeForces", division: "Div 2" }
    ]);
    const [groupInfo] = useState({
        name: "Competitive Programming",
        description: "A community of competitive programmers sharing resources, discussing problems, and preparing for contests.",
        members: 156,
        discussions: 3
    });
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async (searchTerm = "") => {
        try {
            const response = await axios.get(`http://localhost:5000/api/discussions?search=${searchTerm}`);
            setDiscussions(response.data);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            fetchDiscussions(value);
        }, 300);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const openDiscussionDetails = (discussion) => {
        setSelectedDiscussion(discussion);
        setIsDetailsOpen(true);
    };
    
    const closeDiscussionDetails = () => {
        setIsDetailsOpen(false);
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <div className="min-h-screen bg-[#06141D] text-gray-200 p-6 w-full max-w-7xl mx-auto">
                {/* Header with group info and start discussion button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {groupInfo.name} Group
                        </h1>
                        <div className="flex items-center space-x-4 text-gray-400">
                            <span className="flex items-center space-x-1">
                                <FaUserFriends className="h-5 w-5" />
                                <span>{groupInfo.members} members</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <FaCommentAlt className="h-5 w-5" />
                                <span>{groupInfo.discussions} discussions</span>
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={openModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4 md:mt-0">
                        Start Discussion
                    </button>
                </div>

                {/* Main content area with sidebar and discussions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1">
                        {/* About Group */}
                        <div className="bg-[#151f2a] p-4 rounded-lg mb-6">
                            <h2 className="text-xl font-bold mb-3 text-white">About Group</h2>
                            <p className="text-gray-300">{groupInfo.description}</p>
                        </div>

                        {/* Popular Topics */}
                        <div className="bg-[#151f2a] p-4 rounded-lg mb-6">
                            <h2 className="text-xl font-bold mb-3 text-white">Popular Topics</h2>
                            <div className="space-y-2">
                                {popularTopics.map((topic, index) => (
                                    <div key={index} className="bg-[#1a283a] px-3 py-2 rounded-md hover:bg-[#1e3148] cursor-pointer">
                                        {topic}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Contests */}
                        <div className="bg-[#151f2a] p-4 rounded-lg">
                            <h2 className="text-xl font-bold mb-3 text-white">Upcoming Contests</h2>
                            <div className="space-y-3">
                                {upcomingContests.map((contest, index) => (
                                    <div key={index} className="flex items-start">
                                        <span className="text-yellow-500 mr-2">🏆</span>
                                        <div>
                                            <div className="font-semibold">{contest.name}</div>
                                            <div className="text-sm text-gray-400">{contest.platform} • {contest.division}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3">
                        {/* Search and Filter Bar */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-4">
                                <div className="relative flex-1">
                                    <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Search discussions..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="w-full pl-10 pr-4 py-2 bg-[#151f2a] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-[#151f2a] border border-gray-700 rounded-md hover:bg-[#1a283a]">
                                    <FaFilter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <button className="flex items-center justify-center space-x-2 p-3 bg-[#151f2a] rounded-lg hover:bg-[#1a283a]">
                                    <span className="text-blue-500">⟨⟩</span>
                                    <span>Share Solution</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 p-3 bg-[#151f2a] rounded-lg hover:bg-[#1a283a]">
                                    <FaBook className="h-5 w-5 text-green-500" />
                                    <span>Resources</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 p-3 bg-[#151f2a] rounded-lg hover:bg-[#1a283a]">
                                    <FaClock className="h-5 w-5 text-purple-500" />
                                    <span>Practice Timer</span>
                                </button>
                            </div>
                        </div>

                        {/* Discussion Posts */}
                        <div className="space-y-6">
                            {discussions.length > 0 ? (
                                discussions.map((discussion) => (
                                    <DiscussionCard 
                                        key={discussion._id} 
                                        discussion={discussion} 
                                        onClick={() => openDiscussionDetails(discussion)}
                                    />
                                ))
                            ) : (
                                <div className="text-center p-10 bg-[#151f2a] rounded-lg">
                                    <p className="text-gray-400 mb-3">No discussions found</p>
                                    <button 
                                        onClick={openModal}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Start a New Discussion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Discussion Modal */}
            <DiscussionModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                fetchDiscussions={fetchDiscussions} 
            />

            {/* Discussion Details Modal */}
            <DiscussionDetails
                discussion={selectedDiscussion}
                isOpen={isDetailsOpen}
                onClose={closeDiscussionDetails}
                fetchDiscussions={fetchDiscussions}
            />
        </div>
    );
};

// Discussion Card Component
const DiscussionCard = ({ discussion, onClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleReadMoreClick = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        setIsExpanded(true);
    };
    
    return (
        <div 
            className="bg-[#151f2a] p-6 rounded-lg shadow-lg cursor-pointer hover:bg-[#1a283a] transition-colors"
            onClick={onClick}
        >
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={`https://ui-avatars.com/api/?name=${discussion.createdBy.username}&background=random`}
                    alt={discussion.createdBy.username}
                    className="h-10 w-10 rounded-full"
                />
                <div>
                    <h3 className="font-semibold text-white">{discussion.createdBy.username}</h3>
                    <p className="text-sm text-gray-400">
                        about {new Date(discussion.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-white mb-3">
                {discussion.title}
            </h2>
            <div className="text-gray-300 mb-4">
                {isExpanded || discussion.content.length <= 200 ? (
                    <p>{discussion.content}</p>
                ) : (
                    <>
                        <p>{discussion.content.substring(0, 200)}...</p>
                        <button 
                            onClick={handleReadMoreClick}
                            className="text-blue-400 hover:text-blue-300 text-sm mt-1"
                        >
                            Read more
                        </button>
                    </>
                )}
            </div>

            <div className="flex items-center space-x-6 text-gray-400">
                <span className="flex items-center space-x-1">
                    <FaTag className="h-4 w-4" />
                    <span>{discussion.tags && discussion.tags.length > 0 ? discussion.tags[0] : "Competitive Programming"}</span>
                </span>
                <button 
                    className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
                >
                    <FaThumbsUp className="h-4 w-4" />
                    <span>{Math.floor(Math.random() * 30)}</span>
                </button>
                <span className="flex items-center space-x-1">
                    <FaComment className="h-4 w-4" />
                    <span>{discussion.comments ? discussion.comments.length : 0}</span>
                </span>
            </div>
        </div>
    );
};

export default DiscussionPage;
