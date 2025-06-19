import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTask(storedTasks);
  }, []);

  const getStatusClass = (status) => {
    if (status === 'Pending') return 'bg-red-600 hover:bg-red-700';
    if (status === 'Completed') return 'bg-green-600 hover:bg-green-700';
    if (status === 'In Progress') return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-gray-400';
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-slate-800 text-white p-4 shadow-md text-center text-2xl font-semibold">
        Admin Dashboard
      </header>

      
      <main className="flex flex-1">
        
        <aside className="w-64 bg-slate-700 text-white p-4 space-y-4 hidden md:block">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block hover:bg-slate-600 p-2 rounded">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block hover:bg-slate-600 p-2 rounded">Users</a>
              </li>
              <li>
                <a href="#" className="block hover:bg-slate-600 p-2 rounded">Settings</a>
              </li>
              <li>
                <Link to="/assign-task" className="block hover:bg-slate-600 p-2 rounded">
                  Assign Task
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

       
        <section className="flex-1 p-6 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Overview</h2>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Task List</h3>

            {task.length === 0 ? (
              <p className="text-gray-600">No tasks available.</p>
            ) : (
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">User Email</th>
                    <th className="p-2 border">Action</th>
                    <th className="p-2 border">Task</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {task.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="p-2 border">{t.assignedTo}</td>
                      <td className="p-2 border">Assigned Task</td>
                      <td className="p-2 border">{t.title}</td>
                      <td
                        className={`p-3 border text-white font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${getStatusClass(t.status)}`}
                      >
                        {t.status}
                      </td>
                      <td className="p-2 border">{t.createdAt}</td>
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
