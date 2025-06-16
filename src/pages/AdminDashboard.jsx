import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [task, setTask] = useState([]);

  // Fetch tasks from localStorage when component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTask(storedTasks);
  }, []);

  // Function to get className for priority badge
  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'bg-red-600 hover:bg-red-700';
    if (priority === 'Medium') return 'bg-yellow-500 hover:bg-yellow-600';
    if (priority === 'Low') return 'bg-green-600 hover:bg-green-700';
    return 'bg-gray-400';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md text-center text-2xl font-semibold">
        Admin Dashboard
      </header>

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-700 text-white p-4 space-y-4 hidden md:block">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block hover:bg-slate-600 p-2 rounded">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-slate-600 p-2 rounded">
                  Users
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-slate-600 p-2 rounded">
                  Settings
                </a>
              </li>
              <li>
                <Link to="/assign-task" className="block hover:bg-slate-600 p-2 rounded">
                  Assign Task
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <section className="flex-1 p-6 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Overview</h2>

          {/* Task List Table */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Task List</h3>
            {task.length === 0 ? (
              <p className="text-gray-600">No tasks available.</p>
            ) : (
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-gray-200 text-center">
                    <th className="p-2">User Email</th>
                    <th className="p-2">Action</th>
                    <th className="p-2">Task</th>
                    <th className="p-2 text-center">Priority</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {task.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="p-2">{t.assignedTo}</td>
                      <td className="p-2">Assigned Task</td>
                      <td className="p-2">{t.title}</td>
                      <td
                        className={`p-3 ${getPriorityClass(
                          t.status
                        )} text-white font-medium rounded-xl shadow-md shadow-black/30 text-center backdrop-blur-sm transition-all duration-300 ease-in-out transform hover:scale-105`}
                      >
                        {t.status}
                      </td>
                      <td className="p-2">{t.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
