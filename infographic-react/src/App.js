import React, { useState } from 'react';
import ChatAnalysisSlideDeck from './ChatAnalysisSlidedeck';
import ChatAnalysisDashboard from './ChatAnalysisDashboard';


export default function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setView('dashboard')} className="px-4 py-2 bg-blue-500 rounded">
          Dashboard
        </button>
        <button onClick={() => setView('slidedeck')} className="px-4 py-2 bg-green-500 rounded">
          SlideDeck
        </button>
      </div>

      {view === 'dashboard' ? <ChatAnalysisDashboard /> : <ChatAnalysisSlideDeck />}
    </div>
  );
}
