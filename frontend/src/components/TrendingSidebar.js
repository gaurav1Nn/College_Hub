// TrendingSidebar.jsx
import React from "react";
import { FaChartLine, FaHashtag } from "react-icons/fa";

const trendingTags = [
  "JavaScript",
  "Full Stack",
  "Team Work",
  "Mobile Dev",
  "Interviews",
  "Projects",
  "Assignment"
];

const TrendingSidebar = () => {
  return (
    <aside className="bg-secondary rounded-lg shadow-md overflow-hidden">
      <header className="bg-gradient-to-r from-accent to-accent-light p-4 flex items-center">
        <FaChartLine className="mr-2 text-white" aria-hidden="true" />
        <h2 className="text-white text-lg font-semibold">Trending</h2>
      </header>

      <nav aria-label="Trending topics">
        <ul className="p-4 space-y-3">
          {trendingTags.map(tag => (
            <li key={tag}>
              <a 
                href={`#${tag.toLowerCase().replace(/\s+/g, '')}`}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-card transition duration-300 group"
              >
                <FaHashtag className="text-accent mr-2 group-hover:text-secondary-accent" />
                <span className="text-text-secondary group-hover:text-white transition-colors">
                  {tag}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default TrendingSidebar;
