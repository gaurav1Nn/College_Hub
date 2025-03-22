import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaThumbsUp, FaComment, FaTag, FaUser } from "react-icons/fa";

const DiscussionDetails = ({ discussion, isOpen, onClose, fetchDiscussions }) => {
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !discussion) return null;

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setIsSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/discussions/${discussion._id}/comments`,
                { text: commentText },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setCommentText('');
            fetchDiscussions(); // Refresh discussions list
        } catch (error) {
            console.error('Error posting comment:', error);
            setError(error.response?.data?.message || 'Failed to post comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 overflow-y-auto">
            <div className="bg-[#151f2a] rounded-lg w-full max-w-4xl my-8 relative overflow-hidden">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-[#151f2a]">
                    <h2 className="text-xl font-semibold text-white">Discussion</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6">
                    {/* Discussion Author Info */}
                    <div className="flex items-center space-x-4 mb-6">
                        <img
                            src={`https://ui-avatars.com/api/?name=${discussion.createdBy.username}&background=random`}
                            alt={discussion.createdBy.username}
                            className="h-12 w-12 rounded-full"
                        />
                        <div>
                            <h3 className="font-semibold text-white text-lg">{discussion.createdBy.username}</h3>
                            <p className="text-sm text-gray-400">
                                Posted on {new Date(discussion.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Discussion Content */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-4">{discussion.title}</h1>
                        <p className="text-gray-300 whitespace-pre-line">{discussion.content}</p>
                        
                        {/* Tags */}
                        {discussion.tags && discussion.tags.length > 0 && (
                            <div className="flex flex-wrap mt-4 gap-2">
                                {discussion.tags.map((tag, index) => (
                                    <div key={index} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                                        <FaTag className="h-3 w-3" />
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Engagement indicators */}
                        <div className="flex items-center space-x-8 mt-6 text-gray-400">
                            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                                <FaThumbsUp className="h-4 w-4" />
                                <span>{Math.floor(Math.random() * 30)}</span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <FaComment className="h-4 w-4" />
                                <span>{discussion.comments ? discussion.comments.length : 0} comments</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-700 my-6" />

                    {/* Comments Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
                                {error}
                            </div>
                        )}
                        
                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-8">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add your comment..."
                                className="w-full p-3 bg-[#0d1520] border border-gray-700 rounded-md text-white min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>
                        </form>

                        {/* List of Comments */}
                        <div className="space-y-4">
                            {discussion.comments && discussion.comments.length > 0 ? (
                                discussion.comments.map((comment, index) => (
                                    <div key={index} className="bg-[#1a283a] p-4 rounded-lg">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center">
                                                <FaUser className="text-gray-300 h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{comment.createdBy.username}</p>
                                                <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 mt-2">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscussionDetails; 