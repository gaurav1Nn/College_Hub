import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";

const DiscussionModal = ({ isOpen, onClose, fetchDiscussions }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            const formattedTags = tags.split(",").map(tag => tag.trim());

            await axios.post(
                'http://localhost:5000/api/discussions', 
                { title, content, tags: formattedTags },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            // Reset form and close modal
            setTitle("");
            setContent("");
            setTags("");
            fetchDiscussions(); // Refresh discussions list
            onClose();
        } catch (error) {
            console.error("Error posting discussion:", error);
            setError(error.response?.data?.message || "Failed to post discussion. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
            <div className="bg-[#151f2a] rounded-lg w-full max-w-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">Start New Discussion</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
                            {error}
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Discussion Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 bg-[#0d1520] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What's your question or topic?"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 bg-[#0d1520] border border-gray-700 rounded-md text-white h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your question or discussion topic in detail..."
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full p-3 bg-[#0d1520] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Dynamic Programming, Graph Algorithms"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Posting...' : 'Post Discussion'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DiscussionModal; 