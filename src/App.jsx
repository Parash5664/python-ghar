// src/App.jsx

import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Practice from './components/Practice';
import RunCode from './components/RunCode';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Python-Ghar</h1>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Home of Python Learning</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'dashboard' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'learn' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('learn')}
            >
              Learn
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'practice' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('practice')}
            >
              Practice
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'code-playground' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('code-playground')}
            >
              Code Playground
            </button>
          </div>
        </nav>

        <main>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'learn' && <Learn />}
          {activeTab === 'practice' && <Practice />}
          {activeTab === 'code-playground' && <RunCode />}
        </main>
      </div>
    </div>
  );
};

export default App;