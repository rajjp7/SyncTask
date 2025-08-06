  import React, { useState, useEffect } from 'react';
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import Login from './pages/Login';
  import AdminDashboard from './pages/AdminDashboard';
  import UserDashboard from './pages/UserDashboard';
  import AssignTask from './pages/AssignTask';
  import Register from './pages/Register';
  import SettingsPage from './pages/SettingsPage';
  import UsersPage from './pages/UsersPage';
  import LeaderboardPage from './pages/LeaderBoardPage';
  import LandingPage from './pages/LandingPage';
  import UserLeaderboard from './pages/UserLeaderBoard';
  const App = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null); 

    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);

      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) setUser(storedUser);
    }, []);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login setUser={setUser} />} />
    <Route path="/register" element={<Register />} />
    <Route path="/admin-dashboard" element={<AdminDashboard tasks={tasks} />} />
    <Route path="/user-dashboard" element={<UserDashboard user={user} tasks={tasks} />} />
    <Route path="/assign-task" element={<AssignTask setTasks={setTasks} />} />
   <Route path="/admin-settings" element={<SettingsPage />} />
  <Route path="/admin-users" element={<UsersPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/user-leaderboard" element={<UserLeaderboard user={user} tasks={tasks} />} />
  </Routes>
      </BrowserRouter>
    );
  };

  export default App;
