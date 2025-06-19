import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user: propUser, tasks: propTasks }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser || null);
  const [tasks, setTasks] = useState(propTasks || []);

  useEffect(() => {
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [propUser]);

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId && task.assignedTo?.toLowerCase() === user.email?.toLowerCase()
        ? { ...task, status: 'Completed' }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Please log in to view your dashboard.
      </div>
    );
  }

  const userTasks = tasks.filter(
    (task) =>
      task.assignedTo?.trim().toLowerCase() === user.email?.trim().toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
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

                {task.status !== 'Completed' && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                  >
                    ✅ Mark as Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
