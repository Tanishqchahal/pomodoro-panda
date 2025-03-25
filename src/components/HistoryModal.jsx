import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

function HistoryModal({ onClose }) {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    dailyAverage: 0
  });
  
  // Load history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
    setHistory(savedHistory);
    
    // Calculate stats
    if (savedHistory.length > 0) {
      const totalSessions = savedHistory.length;
      const totalMinutes = savedHistory.reduce((sum, session) => sum + session.duration, 0);
      
      // Calculate daily average (sessions in the last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const recentSessions = savedHistory.filter(
        session => new Date(session.date) >= oneWeekAgo
      );
      
      const dailyAverage = recentSessions.length > 0 
        ? Math.round((recentSessions.reduce((sum, session) => sum + session.duration, 0) / 7) * 10) / 10
        : 0;
      
      setStats({
        totalSessions,
        totalMinutes,
        dailyAverage
      });
    }
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Clear history
  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.setItem('pomodoroHistory', '[]');
      setHistory([]);
      setStats({
        totalSessions: 0,
        totalMinutes: 0,
        dailyAverage: 0
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#D4F79E] rounded-lg w-[600px] max-w-[95%] p-6 relative max-h-[85vh] overflow-auto shadow-xl">
        <button 
          className="absolute top-2 right-4 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-[#87D766] pb-2">Session History</h2>
        
        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#96E078] p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-700 font-medium">Total Sessions</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalSessions}</p>
          </div>
          <div className="bg-[#96E078] p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-700 font-medium">Total Minutes</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalMinutes}</p>
          </div>
          <div className="bg-[#96E078] p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-700 font-medium">Daily Average</p>
            <p className="text-2xl font-bold text-gray-800">{stats.dailyAverage} min</p>
          </div>
        </div>
        
        {/* Session list */}
        {history.length > 0 ? (
          <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
            {history.slice().reverse().map((session, index) => (
              <div 
                key={index} 
                className="border border-[#87D766] rounded-lg p-4 flex justify-between items-center bg-white/60 hover:bg-white/80 transition-colors shadow-sm hover:shadow-md"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{session.task || "Unnamed Session"}</p>
                  <p className="text-sm text-gray-600">{formatDate(session.date)}</p>
                </div>
                <div className="bg-[#87D766] px-6 py-2 rounded-full text-sm font-medium text-gray-800 shadow-sm min-w-[50px] text-center">
                  {session.duration} min
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-700 py-12 bg-white/30 rounded-lg border border-[#87D766] border-dashed">
            <p className="text-lg">No sessions recorded yet.</p>
            <p className="text-sm mt-2">Complete a pomodoro session to see it here!</p>
          </div>
        )}
        
        {/* Clear history button */}
        {history.length > 0 && (
          <div className="mt-6 text-center">
            <button 
              onClick={clearHistory}
              className="bg-[#87D766] hover:bg-[#96E078] text-gray-800 px-5 py-2 rounded-lg min-w-[110px] cursor-pointer transition-colors font-medium shadow-sm hover:shadow-md"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryModal