import React, { useState } from 'react'
import { X, Bell, Clock, Coffee, Settings as SettingsIcon } from 'lucide-react'

function SettingsModal({ settings, onSave, onClose }) {
  const [localSettings, setLocalSettings] = useState({...settings});
  const [activeTab, setActiveTab] = useState('timer');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings({
      ...localSettings,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localSettings);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-gradient-to-br from-[#D4F79E] to-[#C9F280] rounded-xl w-[95%] sm:w-full max-w-[700px] p-3 sm:p-4 md:p-8 relative shadow-2xl max-h-[90vh] overflow-auto border border-[#87D766]/50">
        <button 
          className="absolute top-2 right-3 text-gray-700 hover:text-gray-900 transition-colors bg-white/50 p-1.5 sm:p-2 rounded-full hover:bg-white/80 cursor-pointer"
          onClick={onClose}
          aria-label="Close settings"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-800 flex items-center gap-2">
          <SettingsIcon size={20} className="sm:w-6 sm:h-6 text-[#5A9E32]" />
          <span>Settings</span>
        </h2>
        
        {/* Tabs */}
        <div className="flex mb-3 sm:mb-4 md:mb-6 bg-white/30 p-1 rounded-lg border border-[#87D766]/50 shadow-inner">
          <button
            type="button"
            className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 md:px-4 rounded-md flex items-center justify-center gap-1 md:gap-2 transition-all cursor-pointer text-xs sm:text-sm md:text-base ${
              activeTab === 'timer' 
                ? 'bg-[#87D766] text-gray-800 font-medium shadow-sm' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
            onClick={() => setActiveTab('timer')}
          >
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span>Timer</span>
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 md:px-4 rounded-md flex items-center justify-center gap-1 md:gap-2 transition-all cursor-pointer text-xs sm:text-sm md:text-base ${
              activeTab === 'preferences' 
                ? 'bg-[#87D766] text-gray-800 font-medium shadow-sm' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            <Coffee size={14} className="sm:w-4 sm:h-4" />
            <span>Preferences</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Timer Settings Tab */}
          {activeTab === 'timer' && (
            <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeIn">
              <div className="bg-yellow-100/70 p-2 sm:p-3 md:p-4 rounded-lg border border-yellow-200 flex items-start gap-2 sm:gap-3">
                <div className="text-yellow-600 mt-0.5">⚠️</div>
                <p className="text-xs md:text-sm text-gray-700">
                  Changing these settings will reset any timer currently in progress.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {/* Work time setting */}
                <div className="bg-white/80 p-3 sm:p-4 md:p-5 rounded-lg border border-[#87D766] shadow-sm hover:shadow-md transition-shadow">
                  <label className="block mb-1.5 sm:mb-2 md:mb-3 text-gray-800 font-medium flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                    <Clock size={14} className="sm:w-4 sm:h-4 text-[#5A9E32]" />
                    Work Time
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="workTime"
                      value={localSettings.workTime}
                      onChange={handleChange}
                      className="w-full p-1.5 sm:p-2 md:p-3 border border-[#87D766] rounded-lg bg-white focus:ring-2 focus:ring-[#87D766] focus:outline-none text-center text-sm sm:text-base md:text-lg font-semibold"
                      min="1"
                      max="60"
                    />
                    <span className="ml-2 sm:ml-3 text-gray-700 font-medium text-sm sm:text-base">min</span>
                  </div>
                </div>
                
                {/* Break time setting */}
                <div className="bg-white/80 p-3 sm:p-4 md:p-5 rounded-lg border border-[#87D766] shadow-sm hover:shadow-md transition-shadow">
                  <label className="block mb-1.5 sm:mb-2 md:mb-3 text-gray-800 font-medium flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                    <Coffee size={14} className="sm:w-4 sm:h-4 text-[#5A9E32]" />
                    Break Time
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="breakTime"
                      value={localSettings.breakTime}
                      onChange={handleChange}
                      className="w-full p-1.5 sm:p-2 md:p-3 border border-[#87D766] rounded-lg bg-white focus:ring-2 focus:ring-[#87D766] focus:outline-none text-center text-sm sm:text-base md:text-lg font-semibold"
                      min="1"
                      max="30"
                    />
                    <span className="ml-2 sm:ml-3 text-gray-700 font-medium text-sm sm:text-base">min</span>
                  </div>
                </div>
                
                {/* Long break time setting */}
                <div className="bg-white/80 p-3 sm:p-4 md:p-5 rounded-lg border border-[#87D766] shadow-sm hover:shadow-md transition-shadow">
                  <label className="block mb-1.5 sm:mb-2 md:mb-3 text-gray-800 font-medium flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                    <Coffee size={14} className="sm:w-4 sm:h-4 text-[#5A9E32]" />
                    Long Break
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="longBreakTime"
                      value={localSettings.longBreakTime}
                      onChange={handleChange}
                      className="w-full p-1.5 sm:p-2 md:p-3 border border-[#87D766] rounded-lg bg-white focus:ring-2 focus:ring-[#87D766] focus:outline-none text-center text-sm sm:text-base md:text-lg font-semibold"
                      min="1"
                      max="60"
                    />
                    <span className="ml-2 sm:ml-3 text-gray-700 font-medium text-sm sm:text-base">min</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeIn">
              <div className="bg-white/80 p-3 sm:p-4 md:p-5 rounded-lg border border-[#87D766] shadow-sm">
                <h3 className="font-medium text-gray-800 mb-2 sm:mb-3 md:mb-4">Notification Settings</h3>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-1.5 sm:p-2 md:p-3 bg-[#E8FBCF] rounded-lg">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                      <Bell size={14} className="sm:w-4 sm:h-4 text-[#5A9E32]" />
                      <span className="text-xs sm:text-sm md:text-base text-gray-800">Timer Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        name="allowNotifications"
                        checked={localSettings.allowNotifications || false}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          allowNotifications: e.target.checked
                        })}
                      />
                      <div className="w-7 sm:w-9 h-4 sm:h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 sm:after:h-4 after:w-3 sm:after:w-4 after:transition-all peer-checked:bg-[#87D766]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-1.5 sm:p-2 md:p-3 bg-[#E8FBCF] rounded-lg">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                      <SettingsIcon size={14} className="sm:w-4 sm:h-4 text-[#5A9E32]" />
                      <span className="text-xs sm:text-sm md:text-base text-gray-800">Hide Title</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        name="hideTitle"
                        checked={localSettings.hideTitle || false}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          hideTitle: e.target.checked
                        })}
                      />
                      <div className="w-7 sm:w-9 h-4 sm:h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 sm:after:h-4 after:w-3 sm:after:w-4 after:transition-all peer-checked:bg-[#87D766]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Save button */}
          <button 
            type="submit"
            className="w-full py-2 sm:py-3 md:py-4 bg-[#87D766] rounded-lg hover:bg-[#96E078] transition-all text-gray-800 font-semibold text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg mt-4 sm:mt-6 md:mt-8 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <SettingsIcon size={16} className="sm:w-5 sm:h-5" />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsModal