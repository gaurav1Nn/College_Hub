import React from 'react';
import { Rocket, Users, Trophy, BookOpen } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CampusConnect
        </h1>
        <p className="text-xl text-gray-600">
          Your gateway to the college tech community
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Network Growth"
          value="500+"
          description="Active students and alumni"
        />
        <StatCard
          icon={Trophy}
          title="Achievements"
          value="200+"
          description="Projects and hackathon wins"
        />
        <StatCard
          icon={BookOpen}
          title="Interview Experiences"
          value="150+"
          description="Shared by seniors"
        />
        <StatCard
          icon={Rocket}
          title="Placement Rate"
          value="40%"
          description="Increase in engagement"
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Latest Opportunities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add opportunity cards here */}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}