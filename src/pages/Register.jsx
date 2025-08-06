import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserCheck, LoaderCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    
    const validateForm = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        if (!role) newErrors.role = 'Role must be selected.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setTimeout(() => {
            const cleanEmail = email.trim().toLowerCase();
            const cleanPassword = password.trim();
            const cleanRole = role.trim().toLowerCase();
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const existingUser = users.find(user => user.email === cleanEmail);
            if (existingUser) {
                toast.error('User already exists. Please login.');
                setErrors({ email: 'A user with this email already exists.' });
                setIsLoading(false);
                return;
            }

            const newUser = { email: cleanEmail, password: cleanPassword, role: cleanRole };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            toast.success('Registration successful! Please login.');
            setIsLoading(false);
          
            setTimeout(() => navigate('/login'), 1000);
        }, 1000);
    };

    return (
        <>
            <Toaster position="top-center" toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }} />
            <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
              
                <div className="absolute inset-0 bg-gray-900">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-blue-900/50 to-purple-900/50 animate-gradient-xy"></div>
                </div>

                <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Create Your SyncTask Account</h1>
                        <p className="mt-2 text-sm text-gray-400">Get started by filling out the form below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="w-5 h-5 text-gray-400" /></span>
                                <input
                                    id="email" type="email" placeholder="you@example.com"
                                    className={`w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: null }); }}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                     
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Lock className="w-5 h-5 text-gray-400" /></span>
                                <input
                                    id="password" type="password" placeholder="••••••••"
                                    className={`w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: null }); }}
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                        </div>

                    
                        <div>
                            <label htmlFor="role" className="text-sm font-medium text-gray-300">Role</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserCheck className="w-5 h-5 text-gray-400" /></span>
                                <select
                                    id="role"
                                    className={`w-full py-3 pl-10 pr-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none text-white ${errors.role ? 'border-red-500' : 'border-gray-600'} ${!role && 'text-gray-500'}`}
                                    value={role}
                                    onChange={(e) => { setRole(e.target.value); if (errors.role) setErrors({ ...errors, role: null }); }}
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                        </div>

                    
                        <button
                            type="submit" disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-blue-600/20 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400/50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-400 cursor-pointer hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
