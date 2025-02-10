import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoDownload, IoSearchOutline } from 'react-icons/io5'; // Importing the search icon

const ResourceList = ({ refresh }) => {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search); // Debounced search value

    // Debouncing the search input (300ms delay)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // 300ms debounce

        // Cleanup function to cancel the timeout if the user is still typing
        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    const fetchResources = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/resources?search=${debouncedSearch}`);
            setResources(response.data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    // Fetch resources when debounced search value or refresh changes
    useEffect(() => {
        fetchResources();
    }, [debouncedSearch, refresh]);

    return (
        <div className="mb-4">
            {/* Search Input with Icon */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search by Tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // OnChange event for search input
                    className="p-2 pl-10 bg-transparent border border-gray-600 rounded-full w-full"
                />
                <span className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400">
                    <IoSearchOutline />
                </span>
            </div>

            {/* Resource List */}
            <div>
                {resources.map((resource) => (
                    <div key={resource._id} className="relative bg-[#151f2a] p-6 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105">
                    {/* Resource Title */}
                        <h2 className="text-2xl font-semibold text-white mb-3 pr-[10rem]">{resource.name}</h2>
                    
                        {/* Resource Description */}
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {resource.description}
                        </p>
                    
                        {/* Download Button */}
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-6 right-6 text-sm text-white bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-full font-medium transition-colors duration-300 flex items-center space-x-2"
                        >
                            <span>Download</span> 
                            <IoDownload />
                        </a>

                    
                        {/* Tags */}
                        <div className="mt-3">
                            {/* <p className="text-sm text-gray-400 mb-2">Tags:</p> */}
                            <div className="flex flex-wrap gap-2">
                                {resource.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    
                        {/* Metadata */}
                        <div className="mt-4 border-t border-gray-600 pt-4">
                            <p className="text-xs text-gray-500">
                                Uploaded by: <span className="text-white">{resource.createdBy.username}</span>
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(resource.createdAt).toLocaleString()}
                            </p>
                        </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceList;
