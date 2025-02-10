import React, { useState } from 'react';
import axios from 'axios';

const DiscussionInput = ({ fetchDiscussions }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(""); // State for tags

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedTags = tags.split(",").map((tag) => tag.trim()); // Format tags

        try {
            await axios.post('http://localhost:5000/api/discussions', { title, content, tags: formattedTags });
            fetchDiscussions(); // Refresh discussions after adding
            setTitle("");
            setContent("");
            setTags(""); // Clear the tags input after submission
        } catch (error) {
            console.error("Error adding discussion:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className='flex flex-col justify-evenly'>
                <input
                    type="text"
                    placeholder="Discussion Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-4 bg-transparent border border-gray-600 rounded mb-2 w-full"
                    required
                />
                <textarea
                    placeholder="Discussion Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-4 bg-[#06141D] border border-gray-600 rounded mb-2 w-full"
                    required
                />
                {/* Input field for tags */}
                <input
                    type="text"
                    placeholder="Enter tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="p-4 bg-transparent border border-gray-600 rounded mb-2 w-full"
                />
            </div>
            <button type="submit" className="bg-[#3b82f6] text-white p-3 mt-4 rounded">
                Add Discussion
            </button>
        </form>
    );
};

export default DiscussionInput;
