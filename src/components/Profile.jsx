import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [school, setSchool] = useState('Greenwood High School');
  const [grade, setGrade] = useState('11th Grade');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const progressData = [
    { subject: 'Python Basics', progress: 75, color: 'bg-blue-500' },
    { subject: 'Data Science', progress: 40, color: 'bg-green-500' },
    { subject: 'Data Visualization', progress: 20, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your account and track your progress</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">School</label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Grade</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>9th Grade</option>
                    <option>10th Grade</option>
                    <option>11th Grade</option>
                    <option>12th Grade</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition"
              >
                Save Changes
              </button>
            </form>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
            <div className="space-y-6">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.subject}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Achievements</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white mr-3">
                  🏆
                </div>
                <div>
                  <h3 className="font-bold">First Lesson Completed</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed your first lesson</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white mr-3">
                  🔥
                </div>
                <div>
                  <h3 className="font-bold">5-Day Streak</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Practiced for 5 days in a row</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white mr-3">
                  💡
                </div>
                <div>
                  <h3 className="font-bold">Quick Learner</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed 10 lessons</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Change Password
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Notification Preferences
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Privacy Settings
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-red-500">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;