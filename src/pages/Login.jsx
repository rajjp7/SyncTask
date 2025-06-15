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

    // Demo hardcoded credentials check
    if (
      (role === 'admin' && email === 'admin@gmail.com' && password === 'admin123') ||
      (role === 'user' && email === 'user@gmail.com' && password === 'user123')
    ) {
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <input
          className='p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-600 text-white placeholder-white'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className='p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value=''>Select User Type</option>
          <option value='admin'>Admin</option>
          <option value='user'>User</option>
        </select>
        <button
          onClick={handleLogin}
          className='p-3 rounded bg-slate-300 text-black font-semibold hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400'
        >
          Login
        </button>
      </div>
    </div>
  );
}
