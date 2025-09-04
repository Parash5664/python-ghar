import React, { useState } from 'react';

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState('python-basics');

  const modules = [
    {
      id: 'python-basics',
      title: 'Python Basics',
      description: 'Learn the fundamentals of Python programming',
      lessons: [
        { id: 1, title: 'Variables and Data Types', completed: true },
        { id: 2, title: 'Control Structures', completed: true },
        { id: 3, title: 'Functions', completed: false },
        { id: 4, title: 'Modules and Packages', completed: false },
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Introduction to data analysis with Python',
      lessons: [
        { id: 1, title: 'Introduction to Pandas', completed: true },
        { id: 2, title: 'DataFrames and Series', completed: false },
        { id: 3, title: 'Data Cleaning', completed: false },
        { id: 4, title: 'Data Visualization with Pandas', completed: false },
      ]
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      description: 'Create beautiful charts and graphs',
      lessons: [
        { id: 1, title: 'Matplotlib Basics', completed: false },
        { id: 2, title: 'Seaborn for Statistical Graphics', completed: false },
        { id: 3, title: 'Interactive Visualizations with Plotly', completed: false },
      ]
    }
  ];

  const currentModule = modules.find(module => module.id === selectedModule);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Master Python programming step by step</p>
      
      <div className="flex flex-wrap gap-4 mb-8">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module.id)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              selectedModule === module.id
                ? 'bg-sky-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {module.title}
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{currentModule.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{currentModule.description}</p>
        
        <h3 className="text-xl font-bold mb-4">Lessons</h3>
        <div className="space-y-3">
          {currentModule.lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                lesson.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {lesson.completed ? '✓' : lesson.id}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{lesson.title}</h4>
              </div>
              <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm transition">
                {lesson.completed ? 'Review' : 'Start'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-bold text-lg mb-2">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Official Python documentation and tutorials</p>
            <button className="text-sky-500 hover:text-sky-600 font-medium">Explore</button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition">
            <div className="text-3xl mb-3">🎥</div>
            <h3 className="font-bold text-lg mb-2">Video Tutorials</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Step-by-step video guides for each concept</p>
            <button className="text-sky-500 hover:text-sky-600 font-medium">Watch</button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition">
            <div className="text-3xl mb-3">❓</div>
            <h3 className="font-bold text-lg mb-2">Practice Problems</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Test your knowledge with coding challenges</p>
            <button className="text-sky-500 hover:text-sky-600 font-medium">Practice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;