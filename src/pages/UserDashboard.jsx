import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user: propUser, tasks: propTasks }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser || null);
  const [tasks, setTasks] = useState(propTasks || []);

  useEffect(() => {
    // Load user from localStorage if not provided
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }

    // Load tasks from localStorage if not provided
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [propUser]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Please log in to view your dashboard.
      </div>
    );
  }

  // Proper email matching to avoid case/whitespace issues
  const userTasks = tasks.filter(
    (task) =>
      task.assignedTo?.trim().toLowerCase() === user.email?.trim().toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome, <span className="text-blue-600">{user.email}</span>
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Tasks Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h3>

        {userTasks.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            🚫 You have no tasks assigned.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {userTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 p-5 rounded-lg shadow hover:shadow-md transition border border-gray-200"
              >
                <h4 className="text-lg font-bold text-indigo-700 mb-1">{task.title}</h4>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Status:</span> {task.status}
                  </p>
                  <p>
                    <span className="font-semibold">Assigned on:</span> {task.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
