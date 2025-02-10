import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import DiscussionList from '../components/DiscussionList';
import DiscussionInput from '../components/DiscussionInput';
import Header from '../components/Header';

const DiscussionPage = () => {
    const [discussions, setDiscussions] = useState([]);
    const [search, setSearch] = useState("");
    const debounceTimeoutRef = useRef(null); // To store the timeout ID

    useEffect(() => {
        fetchDiscussions(); // Fetch discussions on initial render
    }, []);

    // Function to fetch discussions
    const fetchDiscussions = async (searchTerm = "") => {
        try {
            const response = await axios.get(`http://localhost:5000/api/discussions?search=${searchTerm}`);
            setDiscussions(response.data);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    // Debounce logic for search input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Clear the previous timeout to reset the debounce timer
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set a new timeout to delay the API call
        debounceTimeoutRef.current = setTimeout(() => {
            fetchDiscussions(value);  // Fetch discussions with the current search term
        }, 300);  // Wait 300ms before triggering the fetch
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <div className="min-h-screen bg-[#06141D] text-gray-200 p-4 w-[80%] flex flex-col">
                <h1 className="text-4xl font-bold text-center my-10">Discussion Section</h1>

                <div className='flex flex-row gap-10'>
                    <div className='w-1/2'>
                        {/* Discussion Input */}
                        <DiscussionInput fetchDiscussions={fetchDiscussions} />
                    </div>

                    <div className='overflow-y-scroll no-scrollbar w-1/2'>
                        {/* Search Input */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search Discussions..."
                                value={search}
                                onChange={handleSearchChange}
                                className="p-2 pl-10 bg-transparent border border-gray-600 rounded-full w-full"
                            />
                            <span className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400">
                                <IoSearchOutline />
                            </span>
                        </div>



                        {/* Discussion List */}
                        <DiscussionList discussions={discussions} fetchDiscussions={fetchDiscussions} />
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
};

export default DiscussionPage;
