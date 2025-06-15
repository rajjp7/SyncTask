import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AssignTask from './pages/AssignTask';

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard tasks={tasks} />} />
        <Route path="/user-dashboard" element={<UserDashboard tasks={tasks} />} />
        <Route path="/assign-task" element={<AssignTask setTasks={setTasks} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
