import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Practice from './components/Practice';
import RunCode from './components/RunCode';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#signup') {
        setAuthMode('signup');
      } else if (window.location.hash === '#login') {
        setAuthMode('login');
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (!isAuthenticated) {
      if (authMode === 'signup') {
        return <Signup onSignup={() => {
          setIsAuthenticated(true);
          setAuthMode('login');
          window.location.hash = '';
        }} />;
      }
      return <Login onLogin={() => {
        setIsAuthenticated(true);
        window.location.hash = '';
      }} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'learn':
        return <Learn />;
      case 'practice':
        return <Practice />;
      case 'run-code':
        return <RunCode />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isAuthenticated && (
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          darkMode={false} 
          setDarkMode={() => {}} 
        />
      )}
      <div className={isAuthenticated ? "ml-64" : ""}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;