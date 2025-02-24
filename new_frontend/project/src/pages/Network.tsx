import React from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';

export function Network() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Tech Community Network
        </h1>
        <div className="flex space-x-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search people..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProfileCard key={i} />
        ))}
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-600">Software Engineer</p>
          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
            <Briefcase className="h-4 w-4" />
            <span>Google</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            React
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            Node.js
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            TypeScript
          </span>
        </div>
      </div>
      <button className="mt-4 w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
        Connect
      </button>
    </div>
  );
}