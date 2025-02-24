import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Search, Filter, Tag, Users, Trophy, Code, BookOpen, Timer } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const CP_GROUP = {
  name: 'Competitive Programming Group',
  members: 156,
  description: 'A community of competitive programmers sharing resources, discussing problems, and preparing for contests.',
  topics: ['Dynamic Programming', 'Graph Algorithms', 'Number Theory', 'String Algorithms', 'Data Structures'],
  upcomingContests: [
    {
      name: 'CodeForces Round #890',
      date: '2024-03-25',
      platform: 'CodeForces',
      difficulty: 'Div 2'
    },
    {
      name: 'LeetCode Weekly Contest',
      date: '2024-03-24',
      platform: 'LeetCode',
      difficulty: 'All Levels'
    }
  ]
};

const TOPICS = [
  { id: 1, name: 'Competitive Programming', color: 'blue' },
  { id: 2, name: 'Web Development', color: 'green' },
  { id: 3, name: 'Machine Learning', color: 'purple' },
  { id: 4, name: 'System Design', color: 'orange' },
  { id: 5, name: 'Interview Prep', color: 'pink' },
];

const SAMPLE_DISCUSSIONS = [
  {
    id: 1,
    title: 'Best resources for learning Dynamic Programming',
    content: 'I\'m preparing for competitive programming contests and want to improve my DP skills. What resources would you recommend?',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    topic: 'Competitive Programming',
    likes: 24,
    comments: 12,
    createdAt: new Date(2024, 2, 15),
  },
  {
    id: 2,
    title: 'How to approach CodeForces problems systematically?',
    content: 'I\'m struggling with rating 1400+ problems on CodeForces. Any tips on how to approach them systematically?',
    author: {
      name: 'Mike Ross',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    topic: 'Competitive Programming',
    likes: 18,
    comments: 8,
    createdAt: new Date(2024, 2, 16),
  },
  {
    id: 3,
    title: 'Graph Theory Study Group - Week 1',
    content: 'Let\'s solve these classic graph problems together: DFS, BFS, Shortest Path, and MST. Share your approaches and optimizations!',
    author: {
      name: 'Alex Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    topic: 'Competitive Programming',
    likes: 32,
    comments: 15,
    createdAt: new Date(2024, 2, 17),
  },
];

export function Discussions() {
  const [selectedTopic, setSelectedTopic] = useState('Competitive Programming');
  const [showGroupInfo, setShowGroupInfo] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Competitive Programming Group
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center space-x-1">
              <Users className="h-5 w-5" />
              <span>{CP_GROUP.members} members</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageSquare className="h-5 w-5" />
              <span>{SAMPLE_DISCUSSIONS.length} discussions</span>
            </span>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Start Discussion
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* Group Info */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-900 mb-2">About Group</h2>
            <p className="text-gray-600 text-sm mb-4">{CP_GROUP.description}</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {CP_GROUP.topics.map((topic) => (
                    <span key={topic} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Contests */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-900 mb-4">Upcoming Contests</h2>
            <div className="space-y-4">
              {CP_GROUP.upcomingContests.map((contest, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <Trophy className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{contest.name}</h3>
                      <p className="text-sm text-gray-500">{contest.platform} • {contest.difficulty}</p>
                      <p className="text-sm text-gray-500">{contest.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                <Code className="h-5 w-5 text-blue-600" />
                <span>Share Solution</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span>Resources</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                <Timer className="h-5 w-5 text-purple-600" />
                <span>Practice Timer</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {SAMPLE_DISCUSSIONS.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscussionCard({ discussion }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={discussion.author.avatar}
          alt={discussion.author.name}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{discussion.author.name}</h3>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(discussion.createdAt, { addSuffix: true })}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {discussion.title}
      </h2>
      <p className="text-gray-600 mb-4">{discussion.content}</p>

      <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-1 text-sm text-gray-500">
          <Tag className="h-4 w-4" />
          <span>{discussion.topic}</span>
        </span>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
          <ThumbsUp className="h-4 w-4" />
          <span>{discussion.likes}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
          <MessageCircle className="h-4 w-4" />
          <span>{discussion.comments}</span>
        </button>
      </div>
    </div>
  );
}