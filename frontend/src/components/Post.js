import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { IoTimeOutline, IoSend, IoEllipsisHorizontal } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Post = ({ postId, avatar, createdBy, title, content, likes, comments: initialComments, createdAt }) => {
  const [user, setUser] = useState({ username: createdBy.username });
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Format the created date to a more elegant format
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise, return a formatted date
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formattedDate = formatDate(createdAt);

  // Function to safely format comment dates
  const formatCommentDate = (dateString) => {
    if (!dateString) return "Recent";
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    } catch (error) {
      return "Recent";
    }
  };

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
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setSubmittingComment(true);

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

      setComments(response.data.comments);
      setCommentText("");
      setSubmittingComment(false);

    } catch (error) {
      console.error("Error posting the comment:", error.response ? error.response.data : error.message);
      setSubmittingComment(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-secondary rounded-xl shadow-md border border-card-border p-5 mb-6 overflow-hidden"
    >
      {/* Post Header */}
      <div className="flex items-start gap-3">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={avatar || `https://ui-avatars.com/api/?name=${createdBy.username}&background=random`}
            alt={`${createdBy.username}'s avatar`}
            className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
          />
          <motion.div 
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center border-2 border-secondary"
            whileHover={{ scale: 1.2 }}
          >
            <span className="text-white text-[10px] font-bold">+</span>
          </motion.div>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <motion.h3 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-semibold text-text-primary"
              >
                {createdBy.username}
              </motion.h3>
              <motion.div 
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center text-text-muted text-xs"
              >
                <IoTimeOutline className="mr-1" />
                <span>{formattedDate}</span>
              </motion.div>
            </div>
            <button className="text-text-muted hover:text-text-primary p-1 rounded-full hover:bg-card transition-colors">
              <IoEllipsisHorizontal />
            </button>
          </div>
          
          <motion.h2
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold mt-3 mb-2 text-text-primary"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Post Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 mb-5 text-text-secondary leading-relaxed"
      >
        <p className="whitespace-pre-line">{content}</p>
      </motion.div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-card-border pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
            isLiked 
              ? "text-accent bg-accent/10" 
              : "text-text-muted hover:text-accent hover:bg-accent/5"
          } transition-all duration-300`}
        >
          {isLiked ? (
            <AiFillLike className={`text-lg ${isLiked ? "animate-pulse-custom" : ""}`} />
          ) : (
            <AiOutlineLike className="text-lg" />
          )}
          <span className="text-sm font-medium">{likeCount}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
            showComments 
              ? "text-accent bg-accent/10" 
              : "text-text-muted hover:text-accent hover:bg-accent/5"
          }`}
        >
          <FaRegComment className="text-lg" />
          <span className="text-sm font-medium">{comments.length}</span>
        </motion.button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="border-t border-card-border my-3"></div>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex items-end space-x-2 mb-4">
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-input text-text-primary border border-card-border rounded-lg p-3 min-h-[80px] focus:ring-2 focus:ring-accent/40 focus:border-accent resize-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className={`flex items-center justify-center bg-accent hover:bg-accent-hover text-white rounded-lg p-3 h-10 w-10 ${
                  submittingComment || !commentText.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <IoSend />
              </motion.button>
            </form>
            
            {/* Comments List */}
            <motion.div 
              className="space-y-4 mt-4 max-h-96 overflow-y-auto pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-lg p-3 flex gap-3"
                  >
                    <div className="flex-shrink-0">
                      {comment.createdBy?.username ? (
                        <img 
                          src={`https://ui-avatars.com/api/?name=${comment.createdBy.username}&background=random`} 
                          alt={`${comment.createdBy.username}'s avatar`} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-8 h-8 text-text-muted" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-text-primary text-sm">
                          {comment.createdBy?.username || "Unknown User"}
                        </h4>
                        <span className="text-xs text-text-muted">
                          {formatCommentDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm mt-1">{comment.text}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.p 
                  className="text-center text-text-muted py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No comments yet. Be the first to comment!
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default Post;
