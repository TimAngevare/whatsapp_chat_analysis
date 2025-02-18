import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatAnalysisDashboard from './ChatAnalysisDashboard';
import ChatAnalysisSlideDeck from './ChatAnalysisSlidedeck';

export default function AppRouter() {
  return (
    <Router>
      <div className="p-4">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/Slidedeck">SlideDeck</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ChatAnalysisDashboard />} />
          <Route path="/Slidedeck" element={<ChatAnalysisSlideDeck />} />
        </Routes>
      </div>
    </Router>
  );
}
