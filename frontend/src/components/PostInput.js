import React, { useState } from "react";
import axios from "axios";
import profile from ".././assets/vhjkl.jpeg";
import { ImCross } from "react-icons/im";

const PostInput = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(); // Default selected category is "Updates"
  const [postContent, setPostContent] = useState(""); // State to hold post content
  const [title, setTitle] = useState(""); // State to hold post title
  const [tags, setTags] = useState(""); // State to hold input tags

  const baseURL = "http://localhost:5000/api/posts"; // Base URL for API
  const discussionURL = "http://localhost:5000/api/discussions"; // Base URL for discussions API

  // Open modal when the input is clicked
  const handleInputClick = () => setShowModal(true);

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
    // setSelectedCategory("Updates"); // Reset category to default
    setPostContent("");
    setTitle("");
    setTags(""); // Clear tags input
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set the selected category state
    setShowModal(true); // Open the modal
  };

  // Handle post submission with Authorization header
  const handlePostSubmit = async () => {
    const postData = {
      title: title,
      content: postContent,
      tags: tags.split(",").map((tag) => tag.trim()), // Split tags by commas and trim spaces
    };

    // Determine API endpoint based on the selected category
    const apiURL =
      selectedCategory === "Ask Questions" ? discussionURL : baseURL; // Use discussions API for "Ask Questions"

    // Get JWT token from localStorage
    const token = localStorage.getItem("token"); // Replace 'token' with the actual key if it's different

    try {
      const response = await axios.post(apiURL, postData, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      console.log("Post successful: ", response.data);
      closeModal(); // Close the modal after successful post
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full max-w-lg mx-auto">
      {/* Top Input Section */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Profile Picture */}
        <img
          src={profile} // Replace with actual profile image URL
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />

        {/* Input Field */}
        <input
          type="text"
          placeholder="What's Happening?"
          className="flex-grow bg-gray-700 text-white p-2 rounded-full outline-none cursor-pointer"
          onClick={handleInputClick} // Open modal on click
        />
      </div>

      {/* Category Buttons Row */}
      <div className="flex justify-evenly mb-4">
        {/* Updates Button */}
        <button
          className={`py-2 px-4 rounded-full ${
            selectedCategory === "Updates"
              ? "bg-blue-600 text-white" // Highlight the selected tab
              : "bg-transparent border border-gray-600 text-white hover:bg-gray-600"
          }`}
          onClick={() => handleCategorySelect("Updates")}
        >
          Updates
        </button>

        {/* Ask Questions Button */}
        <button
          className={`py-2 px-4 rounded-full ${
            selectedCategory === "Ask Questions"
              ? "bg-blue-600 text-white" // Highlight the selected tab
              : "bg-transparent border border-gray-600 text-white hover:bg-gray-600"
          }`}
          onClick={() => handleCategorySelect("Ask Questions")}
        >
          Ask Questions
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mx-auto relative">
            <h3 className="text-white text-lg mb-4">
              {selectedCategory === "Ask Questions"
                ? "Ask a Question"
                : "Create a Post for Updates"}
            </h3>

            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                selectedCategory === "Ask Questions"
                  ? "Enter your question title"
                  : "Enter the title"
              }
              className="w-full mb-3 bg-gray-700 text-white p-3 rounded-lg outline-none"
            />

            {/* Textarea for content */}
            <textarea
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none "
              rows="5"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={
                selectedCategory === "Ask Questions"
                  ? "Write your question"
                  : "Write something for Updates"
              }
            ></textarea>

            {/* Input for Tags */}
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags (comma separated)"
              className="w-full mt-3 bg-gray-700 text-white p-3 rounded-lg outline-none"
            />

            {/* Modal Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                onClick={handlePostSubmit}
              >
                {selectedCategory === "Ask Questions" ? "Ask" : "Post"}
              </button>
            </div>

            {/* Close button in top-right corner */}
            <button
              className="absolute top-2 right-2 text-white text-sm bg-gray-600 hover:bg-gray-500 rounded-full p-2"
              onClick={closeModal}
            >
              <ImCross/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInput;
