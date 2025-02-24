import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Tech Events & Contests
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create Event
        </button>
      </div>

      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <EventCard key={i} />
        ))}
      </div>
    </div>
  );
}

function EventCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <div className="w-full md:w-48 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
              Hackathon
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">Mar 15, 2024</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Campus Hackathon 2024
          </h3>
          <p className="text-gray-600 mb-4">
            Join us for a 24-hour coding challenge where you can showcase your
            skills and win amazing prizes!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="h-5 w-5" />
              <span>24 hours</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin className="h-5 w-5" />
              <span>Main Campus</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Users className="h-5 w-5" />
              <span>100+ registered</span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}