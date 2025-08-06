import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { ClipboardType, FileText, User, Tag, LoaderCircle, ArrowLeft } from 'lucide-react';

export default function AssignTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Pending');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const allUsers = JSON.parse(localStorage.getItem('users')) || [];
      const onlyUsers = allUsers.filter(u => u.role === 'user');
      setUserList(onlyUsers);
    } catch (error) {
      console.error("Failed to parse users from localStorage", error);
      setUserList([]);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Task title is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!assignedTo) newErrors.assignedTo = 'You must assign this task to a user.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        assignedTo: assignedTo,
        status: status,
        createdAt: new Date().toLocaleDateString('en-CA'),
      };
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = [...storedTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      setIsLoading(false);
      toast.success('Task assigned successfully!');
      setTimeout(() => navigate('/admin-dashboard'), 1000);
    }, 1000);
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      <div className="relative min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>
        
        <div className="relative z-10 w-full max-w-2xl">
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => navigate('/admin-dashboard')}
                    className="p-2 rounded-full text-gray-300 hover:bg-gray-700/50 transition mr-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Assign New Task</h1>
                    <p className="text-sm text-gray-400">Fill out the details below to assign a task to a user.</p>
                </div>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                        <label htmlFor="title" className="text-sm font-medium text-gray-300">Task Title</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><ClipboardType className="w-5 h-5 text-gray-400" /></span>
                            <input
                                id="title" type="text" placeholder="e.g., Complete project proposal"
                                className={`w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white ${errors.title ? 'border-red-500' : 'border-gray-600'}`}
                                value={title}
                                onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors({ ...errors, title: null }); }}
                            />
                        </div>
                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                    </div>

                  
                    <div>
                        <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
                        <div className="relative mt-1">
                            <span className="absolute top-3.5 left-0 flex items-center pl-3"><FileText className="w-5 h-5 text-gray-400" /></span>
                            <textarea
                                id="description" placeholder="Provide a detailed description of the task..." rows="4"
                                className={`w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white ${errors.description ? 'border-red-500' : 'border-gray-600'}`}
                                value={description}
                                onChange={(e) => { setDescription(e.target.value); if (errors.description) setErrors({ ...errors, description: null }); }}
                            />
                        </div>
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                    </div>

                    <div>
                        <label htmlFor="assignedTo" className="text-sm font-medium text-gray-300">Assign to User</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><User className="w-5 h-5 text-gray-400" /></span>
                            <select
                                id="assignedTo"
                                className={`w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none text-white ${errors.assignedTo ? 'border-red-500' : 'border-gray-600'} ${!assignedTo && 'text-gray-500'}`}
                                value={assignedTo}
                                onChange={(e) => { setAssignedTo(e.target.value); if (errors.assignedTo) setErrors({ ...errors, assignedTo: null }); }}
                                disabled={userList.length === 0}
                            >
                                <option value="" disabled>{userList.length > 0 ? 'Select a user' : 'No users available'}</option>
                                {userList.map((user) => (<option key={user.email} value={user.email}>{user.email}</option>))}
                            </select>
                        </div>
                        {errors.assignedTo && <p className="mt-1 text-xs text-red-600">{errors.assignedTo}</p>}
                    </div>

                   
                    <div>
                        <label htmlFor="status" className="text-sm font-medium text-gray-300">Status</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Tag className="w-5 h-5 text-gray-400" /></span>
                            <select
                                id="status"
                                className="w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none border-gray-600 text-white"
                                value={status} onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit" disabled={isLoading || userList.length === 0}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-blue-600/20 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400/50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? <LoaderCircle className="animate-spin" /> : 'Assign Task'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </>
  );
};
