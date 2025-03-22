// TrendingSidebar.jsx
import React from "react";
import { FaChartLine, FaHashtag } from "react-icons/fa";

const TrendingSidebar = () => {
  const trendingTags = [
    "JavaScript",
    "Full Stack",
    "Team Work",
    "Mobile Dev",
    "Interviews",
    "Projects",
    "Assignment"
  ];

  return (
    <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent-light p-4 flex items-center">
        <FaChartLine className="mr-2 text-white" />
        <h3 className="text-white text-lg font-semibold">Trending</h3>
      </div>
      
      <ul className="p-4">
        {trendingTags.map((tag, index) => (
          <li key={index} className="mt-3 first:mt-0">
            <a 
              href={`#${tag.toLowerCase().replace(/\s+/g, '')}`}
              className="flex items-center px-3 py-2 rounded-lg hover:bg-card transition-colors duration-300 group"
            >
              <FaHashtag className="text-accent mr-2 group-hover:text-secondary-accent" />
              <span className="text-text-secondary group-hover:text-white transition-colors">
                {tag}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSidebar;
