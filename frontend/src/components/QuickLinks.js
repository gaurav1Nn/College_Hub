import React from "react";
import { FaHome, FaBookOpen, FaComments, FaRoute } from "react-icons/fa";

const QuickLinks = () => (
  <div className="bg-secondary rounded-lg shadow-md mt-6 overflow-hidden">
    <div className="bg-gradient-to-r from-accent to-accent-light p-4">
      <h3 className="text-white text-lg font-semibold">Quick Links 🚀</h3>
    </div>
    
    <ul className="p-4 space-y-3">
      <li>
        <a 
          href="/resources" 
          className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-card group"
        >
          <FaBookOpen className="text-accent mr-3 text-lg group-hover:text-secondary-accent transition-colors" />
          <span className="text-text-secondary group-hover:text-white transition-colors">Resources</span>
        </a>
      </li>
      
      <li>
        <a 
          href="/discussion" 
          className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-card group"
        >
          <FaComments className="text-accent mr-3 text-lg group-hover:text-secondary-accent transition-colors" />
          <span className="text-text-secondary group-hover:text-white transition-colors">Discussion Section</span>
        </a>
      </li>
      
      <li>
        <a 
          href="/" 
          className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-card group"
        >
          <FaHome className="text-accent mr-3 text-lg group-hover:text-secondary-accent transition-colors" />
          <span className="text-text-secondary group-hover:text-white transition-colors">Home</span>
        </a>
      </li>
      
      <li>
        <a 
          href="/roadmap" 
          className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-card group"
        >
          <FaRoute className="text-accent mr-3 text-lg group-hover:text-secondary-accent transition-colors" />
          <span className="text-text-secondary group-hover:text-white transition-colors">Road Map Generator</span>
        </a>
      </li>
    </ul>
  </div>
);

export default QuickLinks;
