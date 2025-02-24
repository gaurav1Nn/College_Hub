import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Network } from './pages/Network';
import { Events } from './pages/Events';
import { Interviews } from './pages/Interviews';
import { Achievements } from './pages/Achievements';
import { Discussions } from './pages/Discussions';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/network" element={<Network />} />
            <Route path="/events" element={<Events />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/discussions" element={<Discussions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;