import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage, darkMode, setDarkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'practice', label: 'Practice', icon: '✏️' },
    { id: 'run-code', label: 'Run Code', icon: '▶️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl z-10 flex flex-col`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white">🤖</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Code Tutor</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Learn Python with AI</p>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? 'bg-sky-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;