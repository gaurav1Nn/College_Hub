import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoIosSend, IoIosTimer } from "react-icons/io";
import axios from "axios";

const Post = ({ postId, avatar, createdBy, title, content, likes, comments: initialComments, createdAt }) => {
  const [user, setUser] = useState({ username: createdBy.username });
  const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the post
  const [likeCount, setLikeCount] = useState(likes); // Track likes separately
  const [comments, setComments] = useState(initialComments); // Track comments
  const [commentText, setCommentText] = useState(""); // To handle comment input
  const [submittingComment, setSubmittingComment] = useState(false); // Track comment submission
  const [showComments, setShowComments] = useState(false); // Track if comments section is visible

  // Format the created date
  const formattedDate = new Date(createdAt).toLocaleString();

  useEffect(() => {
    // Check if the post is already liked by the user
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const likedPosts = userProfile?.likedPosts || [];
    if (likedPosts.includes(postId)) {
      setIsLiked(true);
    }
  }, [postId]);

  // Function to handle the like button click
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`http://localhost:5000/api/posts/like`, { postId }, config);

      setIsLiked(true);
      setLikeCount((prev) => prev + 1);

      // Update local storage to reflect that the post has been liked
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      likedPosts.push(postId);
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    } catch (error) {
      console.error("Error liking the post:", error.response ? error.response.data : error.message);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!commentText.trim()) return; // Prevent empty comments

    try {
      setSubmittingComment(true); // Disable submit button while posting the comment

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      };

      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { text: commentText },
        config
      );

      // Update the comments list with the new comment
      setComments(response.data.comments);
      setCommentText(""); // Clear the comment input
      setSubmittingComment(false);

    } catch (error) {
      console.error("Error posting the comment:", error.response ? error.response.data : error.message);
      setSubmittingComment(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-4">
      <div className="flex items-center">
        <img
          src={avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgH-Ja36phm6ZMX8IfMAUeTQgtc3RsdMpog&s"}
          alt={user.username || "Loading..."}
          className="rounded-full w-12 h-12 mr-4"
        />
        <div>
          <p className="text-white text-lg">{user.username}</p>
          <p className="text-gray-400">@ {formattedDate}</p>
        </div>
      </div>
      <div className="mt-4 text-white">
  <h3 className="font-bold text-lg">{title}</h3>
  <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
</div>

      <div className="flex justify-between mt-4 items-center">
        <div className="flex space-x-4">
          <button
            className={`flex items-center space-x-2 ${isLiked ? "bg-blue-600" : "bg-gray-700"} text-white px-3 py-1 rounded-md hover:bg-blue-500`}
            onClick={handleLike}
            disabled={isLiked} // Disable button if already liked
          >
            <AiFillLike className="text-xl" />
            <span>
              {likeCount} Like{likeCount !== 1 ? "s" : ""}
            </span>
          </button>

          {/* Toggle comments section on click */}
          <button
            className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600"
            onClick={() => setShowComments((prev) => !prev)} // Toggle comments visibility
          >
            <FaComment className="text-xl" />
            <span>
              {comments.length} Comment{comments.length !== 1 ? "s" : ""}
            </span>
          </button>
        </div>
      </div>

      {/* Conditional Rendering of Comments Section */}
      {showComments && (
        <div className="mt-4">
          <h4 className="text-white font-bold">Comments:</h4>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="mt-4 flex">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-grow p-2 rounded-full pl-4 mr-2 bg-transparent border border-[#545353]" // Added `flex-grow` and `mr-2` for spacing
              placeholder="Write a comment..."
              disabled={submittingComment} // Disable input when submitting comment
            />
            <button
              type="submit"
              className="bg-blue-600 text-white text-3xl p-2 rounded-full hover:bg-blue-500"
              disabled={submittingComment} // Disable button when submitting comment
            >
              {submittingComment ? <IoIosTimer /> : <IoIosSend />}
            </button>
          </form>

          {comments.length > 0 && (
            <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-gray-700 p-2 rounded mt-2">
                  <p className="font-bold text-gray-300">{comment.createdBy.username}</p>
                  <p className="text-gray-200">{comment.text}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
