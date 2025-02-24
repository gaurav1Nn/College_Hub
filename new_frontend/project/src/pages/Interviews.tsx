import React from 'react';
import { Search, Building, Calendar, ThumbsUp } from 'lucide-react';

export function Interviews() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Interview Experiences
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Share Experience
        </button>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by company, role, or technology..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <InterviewCard key={i} />
        ))}
      </div>
    </div>
  );
}

function InterviewCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Alex Johnson</h3>
          <p className="text-gray-600">Software Engineer @ Google</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-gray-500">
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Google</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>March 2024</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Interview Rounds</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Online Assessment - DSA and Problem Solving</li>
          <li>Technical Interview - System Design</li>
          <li>Behavioral Interview</li>
          <li>Team Fit Interview</li>
        </ol>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Key Topics</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            Data Structures
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            System Design
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            Algorithms
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
          <ThumbsUp className="h-5 w-5" />
          <span>Helpful (42)</span>
        </button>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Read More
        </button>
      </div>
    </div>
  );
}