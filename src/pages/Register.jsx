import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !password || !role) {
      alert('Please fill all fields');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanRole = role.trim().toLowerCase();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(user => user.email === cleanEmail);
    if (existingUser) {
      alert('User already exists. Please login.');
      return;
    }

    const newUser = { email: cleanEmail, password: cleanPassword, role: cleanRole };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="p-3 rounded border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="p-3 rounded border border-gray-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button
          onClick={handleRegister}
          className="p-3 rounded bg-slate-300 text-black font-semibold hover:bg-slate-700 hover:text-white"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
