import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
  if (!email || !password || !role) {
    alert('Please fill all fields');
    return;
  }

  const loginEmail = email.trim().toLowerCase();
  const loginPassword = password.trim();
  const loginRole = role.trim().toLowerCase();

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(
    (u) =>
      u.email === loginEmail &&
      u.password === loginPassword &&
      u.role === loginRole
  );

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    navigate(user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
  } else {
    alert('Invalid credentials');
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <input
          className="p-3 rounded border border-gray-300"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-3 rounded border border-gray-300"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="p-3 rounded border border-gray-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button
          onClick={handleLogin}
          className="p-3 rounded bg-slate-300 text-black font-semibold hover:bg-slate-700 hover:text-white"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
