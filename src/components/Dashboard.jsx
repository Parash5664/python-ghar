import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Lessons Completed', value: '12', icon: '📚', color: 'bg-blue-500' },
    { title: 'Practice Problems', value: '24', icon: '✏️', color: 'bg-green-500' },
    { title: 'Code Snippets', value: '18', icon: '💻', color: 'bg-purple-500' },
    { title: 'Current Streak', value: '5 days', icon: '🔥', color: 'bg-orange-500' },
  ];

  const modules = [
    { 
      title: 'Python Basics', 
      description: 'Variables, loops, functions, and basic programming concepts',
      progress: 75,
      color: 'bg-blue-500',
      icon: '🐍'
    },
    { 
      title: 'Data Science', 
      description: 'Learn pandas, numpy, and data analysis techniques',
      progress: 40,
      color: 'bg-green-500',
      icon: '📊'
    },
    { 
      title: 'Data Visualization', 
      description: 'Create charts and graphs with matplotlib and seaborn',
      progress: 20,
      color: 'bg-purple-500',
      icon: '📈'
    },
  ];

  const recentActivity = [
    { 
      icon: '✅', 
      title: 'Completed Python Basics Lesson', 
      description: 'You completed the lesson on functions and modules',
      time: '2 hours ago',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
    },
    { 
      icon: '📚', 
      title: 'Started Data Science Module', 
      description: 'You began learning about pandas dataframes',
      time: '1 day ago',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
    },
    { 
      icon: '💻', 
      title: 'Practiced List Comprehensions', 
      description: 'You solved 5 practice problems',
      time: '3 days ago',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Continue your Python learning journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="text-2xl mr-4">{stat.icon}</div>
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Modules</h2>
          <button className="text-sky-600 hover:text-sky-700 font-medium flex items-center">
            View all
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{module.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{module.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{module.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`${module.color} h-2.5 rounded-full`} 
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-lg font-medium transition-colors">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
          <button className="text-sky-600 hover:text-sky-700 font-medium">View all</button>
        </div>
        <div className="space-y-5">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start pb-5 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
              <div className={`p-3 rounded-xl mr-4 ${activity.color}`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{activity.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{activity.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;