import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [task, setTask] = useState([{
    id: 1,
    title: 'Web dev Project',
    description: 'Complete the web development project by end of this month.',
    status: 'In Progress',
    createdAt: '2025-06-15',
  }]);

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
              <li><a href="#" className="block hover:bg-slate-600 p-2 rounded">Dashboard</a></li>
              <li><a href="#" className="block hover:bg-slate-600 p-2 rounded">Users</a></li>
              <li><a href="#" className="block hover:bg-slate-600 p-2 rounded">Settings</a></li>
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-2xl font-bold">₹56,000</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Active Sessions</h3>
              <p className="text-2xl font-bold">87</p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">User</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Raj Patil</td>
                  <td className="p-2">Logged in</td>
                  <td className="p-2">2025-06-15</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Amit Sharma</td>
                  <td className="p-2">Updated Profile</td>
                  <td className="p-2">2025-06-14</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Neha Gupta</td>
                  <td className="p-2">Logged out</td>
                  <td className="p-2">2025-06-14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;