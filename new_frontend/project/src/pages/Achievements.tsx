import React from 'react';
import { Trophy, Award, Star, Filter } from 'lucide-react';

export function Achievements() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Student Achievements
        </h1>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Achievement
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <AchievementCard key={i} />
        ))}
      </div>
    </div>
  );
}

function AchievementCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Trophy className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            First Place - National Hackathon
          </h3>
          <p className="text-gray-500">March 2024</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Led a team of 4 to develop an AI-powered solution for sustainable energy
        management, winning first place among 200+ teams.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
          Hackathon
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
          AI/ML
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
          Team Lead
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-2 text-gray-500">Major Achievement</span>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}