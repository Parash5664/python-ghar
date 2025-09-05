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
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'gradio-app' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('gradio-app')}
            >
              Gradio App
            </button>
          </div>
        </nav>

        <main>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'learn' && <Learn />}
          {activeTab === 'practice' && <Practice />}
          {activeTab === 'code-playground' && <RunCode />}
          {activeTab === 'gradio-app' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Gradio AI Code Tutor</h1>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">About the Gradio App</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Gradio app provides an AI-powered Python learning experience with features like:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>AI Code Generation using StarCoder2 and DeepSeek models</li>
                  <li>Natural Language Explanations with Mistral-7B</li>
                  <li>Interactive Code Execution Environment</li>
                  <li>Pre-built Learning Resources and Examples</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Run Locally</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    To use the full Gradio application with AI features:
                  </p>
                  <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                    git clone https://github.com/Parash5664/python-ghar.git<br/>
                    cd python-ghar<br/>
                    pip install -r requirements.txt<br/>
                    python gradio_app.py
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    Then open <a href="http://localhost:7863" className="text-sky-500 hover:text-sky-600">http://localhost:7863</a> in your browser.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">GitHub Pages Limitation</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    GitHub Pages only serves static files and cannot run the Python backend required for the Gradio app.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    For online access to the Gradio app, consider deploying to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                    <li>Hugging Face Spaces</li>
                    <li>Heroku</li>
                    <li>Render</li>
                    <li>Railway</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">Hugging Face API Tokens</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  To use the AI features in the Gradio app, you'll need Hugging Face API tokens:
                </p>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Sign up at <a href="https://huggingface.co/join" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600">huggingface.co</a></li>
                  <li>Get your API token from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600">Settings → Access Tokens</a></li>
                  <li>Set the token as an environment variable: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">HF_TOKEN=your_token_here</code></li>
                </ol>
                <p className="text-gray-700 dark:text-gray-300">
                  The app uses these models:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                  <li><strong>StarCoder2-3B</strong> - Primary code generation</li>
                  <li><strong>DeepSeek-Coder-1.3B</strong> - Backup code generation</li>
                  <li><strong>Mistral-7B-Instruct-v0.2</strong> - Code explanations</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;