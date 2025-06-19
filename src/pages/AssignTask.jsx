import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignTask = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Pending');
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const onlyUsers = allUsers.filter(u => u.role === 'user');
    setUserList(onlyUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      assignedTo: email,
      status,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 bg-slate-800 text-white p-4 rounded">Assign Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assign to User</label>
          <select
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select a user</option>
            {userList.map((user) => (
              <option key={user.email} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-900 text-white font-semibold px-6 py-2 rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
