import React, { useState } from "react";
import axios from "axios";
import profile from ".././assets/vhjkl.jpeg";
import { ImCross } from "react-icons/im";
import { FaPen, FaQuestionCircle, FaTimes } from "react-icons/fa";

const PostInput = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Updates");
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const baseURL = "http://localhost:5000/api/posts";
  const discussionURL = "http://localhost:5000/api/discussions";

  const handleInputClick = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setPostContent("");
    setTitle("");
    setTags("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handlePostSubmit = async () => {
    const postData = {
      title: title,
      content: postContent,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const apiURL =
      selectedCategory === "Ask Questions" ? discussionURL : baseURL;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(apiURL, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post successful: ", response.data);
      closeModal();
      window.location.reload(); // Refresh to see the new post
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <div className="bg-secondary p-5 rounded-lg shadow-md w-full max-w-lg mx-auto">
      {/* Top Input Section */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Profile Picture */}
        <img
          src={profile}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-accent"
        />

        {/* Input Field */}
        <input
          type="text"
          placeholder="What's Happening?"
          className="flex-grow bg-input text-text-primary p-3 rounded-full outline-none cursor-pointer border border-card-border hover:border-accent/50 transition-colors"
          onClick={handleInputClick}
        />
      </div>

      {/* Category Buttons Row */}
      <div className="flex justify-evenly mb-4">
        {/* Updates Button */}
        <button
          className={`py-2 px-6 rounded-full transition-all duration-300 flex items-center ${
            selectedCategory === "Updates"
              ? "bg-accent text-white shadow-md" 
              : "bg-transparent border border-accent/30 text-text-secondary hover:bg-card"
          }`}
          onClick={() => handleCategorySelect("Updates")}
        >
          <FaPen className={`mr-2 ${selectedCategory === "Updates" ? "text-white" : "text-accent"}`} />
          Updates
        </button>

        {/* Ask Questions Button */}
        <button
          className={`py-2 px-6 rounded-full transition-all duration-300 flex items-center ${
            selectedCategory === "Ask Questions"
              ? "bg-accent text-white shadow-md" 
              : "bg-transparent border border-accent/30 text-text-secondary hover:bg-card"
          }`}
          onClick={() => handleCategorySelect("Ask Questions")}
        >
          <FaQuestionCircle className={`mr-2 ${selectedCategory === "Ask Questions" ? "text-white" : "text-accent"}`} />
          Ask Questions
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-primary/80 z-50 backdrop-blur-sm">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-md mx-auto relative shadow-lg border border-card-border">
            <h3 className="text-text-primary text-xl font-semibold mb-4 flex items-center">
              {selectedCategory === "Ask Questions" ? (
                <>
                  <FaQuestionCircle className="text-accent mr-2" />
                  Ask a Question
                </>
              ) : (
                <>
                  <FaPen className="text-accent mr-2" />
                  Create a Post for Updates
                </>
              )}
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
              className="w-full mb-3 bg-input text-text-primary p-3 rounded-lg outline-none border border-card-border focus:border-accent"
            />

            {/* Textarea for content */}
            <textarea
              className="w-full bg-input text-text-primary p-3 rounded-lg outline-none border border-card-border focus:border-accent"
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
              className="w-full mt-3 bg-input text-text-primary p-3 rounded-lg outline-none border border-card-border focus:border-accent"
            />

            {/* Modal Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-input text-text-secondary px-4 py-2 rounded-lg hover:bg-card transition-colors"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors"
                onClick={handlePostSubmit}
              >
                {selectedCategory === "Ask Questions" ? "Ask" : "Post"}
              </button>
            </div>

            {/* Close button in top-right corner */}
            <button
              className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors bg-input hover:bg-card rounded-full p-2"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInput;
