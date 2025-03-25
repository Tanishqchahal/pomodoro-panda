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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#D4F79E] to-[#C9F280] rounded-xl w-[700px] max-w-[95%] p-8 relative shadow-2xl max-h-[90vh] overflow-auto border border-[#87D766]/50">
        <button 
          className="absolute top-2 right-4 text-gray-700 hover:text-gray-900 transition-colors bg-white/50 p-2 rounded-full hover:bg-white/80 cursor-pointer"
          onClick={onClose}
          aria-label="Close settings"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <SettingsIcon size={24} className="text-[#5A9E32]" />
          <span>Settings</span>
        </h2>
        
        {/* Tabs */}
        <div className="flex mb-6 bg-white/30 p-1 rounded-lg border border-[#87D766]/50 shadow-inner">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'timer' 
                ? 'bg-[#87D766] text-gray-800 font-medium shadow-sm' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
            onClick={() => setActiveTab('timer')}
          >
            <Clock size={18} />
            <span>Timer</span>
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'preferences' 
                ? 'bg-[#87D766] text-gray-800 font-medium shadow-sm' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            <Coffee size={18} />
            <span>Preferences</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Timer Settings Tab */}
          {activeTab === 'timer' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-yellow-100/70 p-4 rounded-lg border border-yellow-200 flex items-start gap-3">
                <div className="text-yellow-600 mt-0.5">⚠️</div>
                <p className="text-sm text-gray-700">
                  Changing these settings will reset any timer currently in progress.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Work time setting */}
                <div className="bg-white/80 p-5 rounded-lg border border-[#87D766] shadow-sm hover:shadow-md transition-shadow">
                  <label className="block mb-3 text-gray-800 font-medium flex items-center gap-2">
                    <Clock size={16} className="text-[#5A9E32]" />
                    Work Time
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="workTime"
                      value={localSettings.workTime}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#87D766] rounded-lg bg-white focus:ring-2 focus:ring-[#87D766] focus:outline-none text-center text-lg font-semibold"
                      min="1"
                      max="60"
                    />
                    <span className="ml-3 text-gray-700 font-medium">min</span>
                  </div>
                </div>
                
                {/* Break time setting */}
                <div className="bg-white/80 p-5 rounded-lg border border-[#87D766] shadow-sm hover:shadow-md transition-shadow">
                  <label className="block mb-3 text-gray-800 font-medium flex items-center gap-2">
                    <Coffee size={16} className="text-[#5A9E32]" />
                    Break Time
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="breakTime"
                      value={localSettings.breakTime}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#87D766] rounded-lg bg-white focus:ring-2 focus:ring-[#87D766] focus:outline-none text-center text-lg font-semibold"
                      min="1"
                      max="30"
                    />
                    <span className="ml-3 text-gray-700 font-medium">min</span>
                  </div>
                </div>
                
                {/* Long break time setting */}
                <div className="bg-white/80 p-5 rounded-lg border border-[#87D766] shadow-sm hover:shadow-md transition-shadow">
                  <label className="block mb-3 text-gray-800 font-medium flex items-center gap-2">
                    <Coffee size={16} className="text-[#5A9E32]" />
                    Long Break
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="longBreakTime"
                      value={localSettings.longBreakTime}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#87D766] rounded-lg bg-white focus:ring-2 focus:ring-[#87D766] focus:outline-none text-center text-lg font-semibold"
                      min="1"
                      max="60"
                    />
                    <span className="ml-3 text-gray-700 font-medium">min</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white/80 p-5 rounded-lg border border-[#87D766] shadow-sm">
                <h3 className="font-medium text-gray-800 mb-4">Notification Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#E8FBCF] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-[#5A9E32]" />
                      <span className="text-gray-800">Timer Notifications</span>
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
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#87D766]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#E8FBCF] rounded-lg">
                    <div className="flex items-center gap-3">
                      <SettingsIcon size={18} className="text-[#5A9E32]" />
                      <span className="text-gray-800">Hide Title</span>
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
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#87D766]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Save button */}
          <button 
            type="submit"
            className="w-full py-4 bg-[#87D766] rounded-lg hover:bg-[#96E078] transition-all text-gray-800 font-semibold text-lg shadow-md hover:shadow-lg mt-8 flex items-center justify-center gap-2 cursor-pointer"
          >
            <SettingsIcon size={20} />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsModal