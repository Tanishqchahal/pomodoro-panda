import React, { useState, useEffect, useRef } from 'react'
import { Settings, History } from 'lucide-react'
import TaskInput from './TaskInput'
import SettingsModal from './SettingsModal'
import HistoryModal from './HistoryModal'

function Timer() {
  // States for timer functionality
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'break', or 'longBreak'
  const [cycles, setCycles] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  
  // States for modals
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Timer settings (can be updated from Settings modal)
  const [timerSettings, setTimerSettings] = useState({
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    allowNotifications: true,
    hideTitle: false
  });
  
  // Reference to store interval ID
  const timerRef = useRef(null);
  
  // Reference to track if we've saved the current session
  const sessionSavedRef = useRef(false);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      setTimerSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  // Timer logic
  useEffect(() => {
    if (isActive) {
      // Reset the session saved flag when starting a new timer
      if (timeLeft === timerSettings.workTime * 60 && mode === 'work') {
        sessionSavedRef.current = false;
      }
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // Update document title only when timer is active and not hidden
      if (!timerSettings.hideTitle) {
        document.title = `${formatTime(timeLeft)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
      }
    } else {
      clearInterval(timerRef.current);
      
      // Reset document title to default when timer is not active
      if (!timerSettings.hideTitle) {
        // Get the original title from index.html
        const originalTitle = document.querySelector('title').getAttribute('data-original') || 'Pomodoro Timer';
        document.title = originalTitle;
      }
    }
    
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, timerSettings.hideTitle, mode]);
  
  // Handle timer completion
  const handleTimerComplete = () => {
    // Play notification sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(err => console.log('Audio play error:', err));
    
    // Show browser notification if allowed
    if (timerSettings.allowNotifications && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: `${mode === 'work' ? 'Work session' : 'Break'} completed!`,
      });
    }
    
    // Save completed session to history if it was a work session
    if (mode === 'work' && !sessionSavedRef.current) {
      saveSessionToHistory();
      sessionSavedRef.current = true; // Mark that we've saved this session
      
      // Update cycles
      const newCycles = cycles + 1;
      setCycles(newCycles);
      
      // After 4 work sessions, take a long break
      if (newCycles % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(timerSettings.longBreakTime * 60);
      } else {
        setMode('break');
        setTimeLeft(timerSettings.breakTime * 60);
      }
    } else if (mode !== 'work') {
      // After break, go back to work mode
      setMode('work');
      setTimeLeft(timerSettings.workTime * 60);
      // Reset the session saved flag for the next work session
      sessionSavedRef.current = false;
    }
    
    // Important: We need to set isActive to false first to clear the existing interval
    setIsActive(false);
    
    // Then use setTimeout to start the next timer after a brief delay
    setTimeout(() => {
      setIsActive(true);
    }, 300);
  };
  
  // Save completed work session to history
  const saveSessionToHistory = () => {
    // Get the task input element using the correct placeholder text
    const taskInputElement = document.querySelector('input[placeholder="What would you like to accomplish?"]');
    const taskText = taskInputElement ? taskInputElement.value : '';
    
    const session = {
      date: new Date().toISOString(),
      duration: timerSettings.workTime,
      task: taskText || 'Unnamed task'
    };
    
    // Log for debugging
    console.log('Saving session with task:', taskText);
    
    const history = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
    history.push(session);
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));
  };
  
  // Handle start/stop button
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  // Handle reset button
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    
    // Reset to work mode and reset cycles
    setMode('work');
    setCycles(0);
    setTimeLeft(timerSettings.workTime * 60);
    
    // Reset the session saved flag
    sessionSavedRef.current = false;
    
    // Clear current task if needed
    const taskInputElement = document.querySelector('input[placeholder="What would you like to accomplish?"]');
    if (taskInputElement) {
      taskInputElement.value = '';
    }
    
    // Reset document title if not hidden
    if (!timerSettings.hideTitle) {
      document.title = `${formatTime(timerSettings.workTime * 60)} - Work`;
    }
  };
  
  // Request notification permission
  useEffect(() => {
    if (timerSettings.allowNotifications && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [timerSettings.allowNotifications]);

  return (
    // Main container with light green background
    <div className="w-[500px] h-[220px] rounded-2xl bg-[#D4F79E] p-4 flex flex-col items-center justify-evenly relative">
      {/* History icon in the top left */}
      <div className="absolute top-4 left-4">
        <History 
          className="w-6 h-6 text-gray-700 cursor-pointer" 
          onClick={() => setShowHistory(true)}
        />
      </div>
      
      {/* Settings icon in the top right */}
      <div className="absolute top-4 right-4">
        <Settings 
          className="w-6 h-6 text-gray-700 cursor-pointer" 
          onClick={() => setShowSettings(true)}
        />
      </div>

      {/* Mode indicator */}
      <div className="text-sm font-medium text-gray-700 -mb-2">
        {mode === 'work' ? 'Work Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
      </div>

      {/* Timer display */}
      <div className="text-8xl font-extralight mt-2">
        {formatTime(timeLeft)}
      </div>

      {/* Button container */}
      <div className="w-full h-10 flex">
        <button 
          className="flex-1 bg-[#87D766] h-full text-xl border-r border-[#96E078] cursor-pointer"
          onClick={toggleTimer}
        >
          {isActive ? 'pause' : 'start'}
        </button>
        <button 
          className="flex-1 bg-[#96E078] h-full text-xl cursor-pointer"
          onClick={resetTimer}
        >
          reset
        </button>
      </div>
      
      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal 
          settings={timerSettings}
          onSave={(newSettings) => {
            setTimerSettings(newSettings);
            localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
            setShowSettings(false);
            
            // Update current timer if needed
            if (!isActive) {
              if (mode === 'work') {
                setTimeLeft(newSettings.workTime * 60);
              } else if (mode === 'break') {
                setTimeLeft(newSettings.breakTime * 60);
              } else {
                setTimeLeft(newSettings.longBreakTime * 60);
              }
            }
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      {/* History Modal */}
      {showHistory && (
        <HistoryModal 
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  )
}

export default Timer