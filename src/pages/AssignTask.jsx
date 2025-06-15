import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignTask = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Pending');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      assignedTo: email,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks(prev => [...prev, newTask]);
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 bg-slate-800 text-white p-4 rounded">Assign Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Task Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="4" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assigned to (Email)</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Progress</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="bg-slate-600 text-white px-4 py-2 rounded">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTask;
