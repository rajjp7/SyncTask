import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AssignTask from './pages/AssignTask';
import Register from './pages/Register';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // stores logged-in user email and role

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login setUser={setUser} />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin-dashboard" element={<AdminDashboard tasks={tasks} />} />
  <Route path="/user-dashboard" element={<UserDashboard user={user} tasks={tasks} />} />
  <Route path="/assign-task" element={<AssignTask setTasks={setTasks} />} />
</Routes>
    </BrowserRouter>
  );
};

export default App;
