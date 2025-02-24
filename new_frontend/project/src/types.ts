export interface User {
  id: string;
  name: string;
  role: 'student' | 'alumni';
  batch: string;
  company?: string;
  position?: string;
  skills: string[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'hackathon' | 'project' | 'certification' | 'other';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'hackathon' | 'workshop' | 'contest';
  registrationLink?: string;
}

export interface InterviewExperience {
  id: string;
  company: string;
  role: string;
  date: string;
  rounds: string[];
  tips: string;
  author: User;
}