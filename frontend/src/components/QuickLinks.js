import React from "react";
import { FaCircle } from "react-icons/fa"; // Importing FontAwesome circle icon

const QuickLinks = () => (
  <div className="bg-gray-700 p-4 mt-4 rounded-lg">
    <h3 className="text-white text-lg font-semibold">Quick Links 🚀</h3>
    <ul className="mt-4 space-y-2">
      <li className="flex items-center text-blue-300 hover:text-blue-500">
        <FaCircle className="text-blue-300 mr-2" />{" "}
        {/* Icon for each list item */}
        <a href="/resources" className="font-medium">
          Resources
        </a>
      </li>
      <li className="flex items-center text-blue-300 hover:text-blue-500">
        <FaCircle className="text-blue-300 mr-2" />
        <a href="/discussion" className="font-medium">
          Discussion Section
        </a>
      </li>
      <li className="flex items-center text-blue-300 hover:text-blue-500">
        <FaCircle className="text-blue-300 mr-2" />
        <a href="/home" className="font-medium">
          Home
        </a>
      </li>
      <li className="flex items-center text-blue-300 hover:text-blue-500">
        <FaCircle className="text-blue-300 mr-2" />
        <a href="/roadmap" className="font-medium">
          Road Map Generator
        </a>
      </li>
    </ul>
  </div>
);

export default QuickLinks;
