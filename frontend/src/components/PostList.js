import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = ({ selectedTab }) => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  // Fetch posts based on the selected tab
  useEffect(() => {
    const fetchPosts = async () => {
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
        setIsLoading(true)
        let response;
        if (selectedTab === "content") {
          response = await axios.get("http://localhost:5000/api/posts/recommendations", config);
        } else if (selectedTab === "collaborative") {
          response = await axios.get("http://localhost:5000/api/posts/collaborative", config);
        } else if (selectedTab === "hybrid") {
          response = await axios.get("http://localhost:5000/api/posts/hybrid", config);
        } else {
          response = await axios.get("http://localhost:5000/api/posts", config);
        }
        setIsLoading(false)
        if (response.data.length === 0) {
          setErrorMessage("No posts available");
        } else {
          setErrorMessage(""); // Clear any previous error messages
          setPosts(response.data); // Set fetched posts in state
        }
      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching posts:", error);
        setErrorMessage("Error fetching posts");
      }
    };

    fetchPosts();
  }, [selectedTab]); // Fetch posts whenever the tab changes

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* Loading spinner */}
        </div>
      ) : errorMessage ? (
        <p className="text-center text-white">{errorMessage}</p> // Display error message
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            createdBy={post.createdBy}
            title={post.title} // Use title property
            content={post.content} // Use content property
            likes={post.likes}
            createdAt={post.createdAt} // Added createdAt for formatting
            comments={post.comments} // Use comments property
          />
        ))
      ) : (
        <p className="text-center text-white">No posts available</p> // Display message if no posts
      )}
    </div>
  );
};

export default PostList;
