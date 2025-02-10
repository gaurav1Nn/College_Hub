import React, { useState } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import PostInput from "../components/PostInput";
import ProfileCard from "../components/ProfileCard";
import QuickLinks from "../components/QuickLinks";
import TrendingSidebar from "../components/TrendingSidebar";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div className="min-h-screen bg-[#06141D] text-gray-200">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-1/4 p-4">
          <ProfileCard />
          <QuickLinks />
        </aside>

        <main className="w-2/4 p-4">
          <PostInput />

          {/* Tab Buttons */}
          <div className="flex justify-center my-4">
            {/* <button
              className={`border border-gray-600 text-white py-2 px-4 m-1 rounded-full hover:bg-gray-600 ${
                selectedTab === "content" ? "bg-gray-600" : "bg-transparent"
              }`}
              onClick={() => setSelectedTab("content")}
            >
              Content
            </button>
            <button
              className={`border border-gray-600 text-white py-2 px-4 m-1 rounded-full hover:bg-gray-600 ${
                selectedTab === "collaborative" ? "bg-gray-600" : "bg-transparent"
              }`}
              onClick={() => setSelectedTab("collaborative")}
            >
              Collaborative
            </button> */}
            <button
              className={`border border-gray-600 text-white py-2 px-4 m-1 rounded-full hover:bg-gray-600 ${
                selectedTab === "all" ? "bg-gray-600" : "bg-transparent"
              }`}
              onClick={() => setSelectedTab("all")}
            >
              All
            </button>
            <button
              className={`border border-gray-600 text-white py-2 px-4 m-1 rounded-full hover:bg-gray-600 ${
                selectedTab === "hybrid" ? "bg-gray-600" : "bg-transparent"
              }`}
              onClick={() => setSelectedTab("hybrid")}
            >
              Recommended
            </button>
          </div>


          {/* PostList Component */}
          <PostList selectedTab={selectedTab} />
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 p-4">
          <TrendingSidebar />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
