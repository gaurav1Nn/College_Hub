import React, { useState } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import PostInput from "../components/PostInput";
import ProfileCard from "../components/ProfileCard";
import QuickLinks from "../components/QuickLinks";
import TrendingSidebar from "../components/TrendingSidebar.js";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div className="min-h-screen bg-primary text-primary-color">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-4 py-6">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 p-4">
          <ProfileCard />
          <QuickLinks />
        </aside>

        <main className="w-full md:w-2/4 p-4">
          <PostInput />

          {/* Tab Buttons */}
          <div className="flex justify-center my-6">
            <button
              className={`border border-accent/30 text-primary-color py-2 px-6 m-1 rounded-full transition-colors duration-300 hover:bg-accent hover:text-white ${
                selectedTab === "all" ? "bg-accent text-white" : "bg-transparent"
              }`}
              onClick={() => setSelectedTab("all")}
            >
              All
            </button>
            <button
              className={`border border-accent/30 text-primary-color py-2 px-6 m-1 rounded-full transition-colors duration-300 hover:bg-accent hover:text-white ${
                selectedTab === "hybrid" ? "bg-accent text-white" : "bg-transparent"
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
        <aside className="w-full md:w-1/4 p-4">
          {/* Try/catch for TrendingSidebar */}
          {(() => {
            try {
              return <TrendingSidebar />;
            } catch (error) {
              console.error("TrendingSidebar error:", error);
              return <div className="bg-secondary rounded-lg p-4">Trending section unavailable</div>;
            }
          })()}
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
