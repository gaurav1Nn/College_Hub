import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, BookOpen, Award, MessageSquare, UserCircle } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/network', icon: Users, label: 'Network' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/interviews', icon: BookOpen, label: 'Interviews' },
  { path: '/achievements', icon: Award, label: 'Achievements' },
  { path: '/discussions', icon: MessageSquare, label: 'Discussions' },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 md:space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={clsx(
                  'flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 text-sm font-medium rounded-md',
                  location.pathname === path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <UserCircle className="h-6 w-6" />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}