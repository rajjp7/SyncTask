import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { LogOut, User, CheckCircle, Clock, Inbox, Loader, AlertTriangle, Trophy } from 'lucide-react';


const TaskCard = ({ task, onComplete }) => {
    const isCompleted = task.status === 'Completed';
    const statusInfo = {
        Completed: { icon: <CheckCircle className="w-4 h-4 text-green-400 mr-2" />, text: 'text-green-400', border: 'border-green-500/50' },
        Pending: { icon: <Clock className="w-4 h-4 text-yellow-400 mr-2" />, text: 'text-yellow-400', border: 'border-yellow-500/50' },
        'In Progress': { icon: <Loader className="w-4 h-4 text-blue-400 mr-2 animate-spin" />, text: 'text-blue-400', border: 'border-blue-500/50' },
    };
    const currentStatus = statusInfo[task.status] || { icon: null, text: 'text-gray-400', border: 'border-gray-500/50' };

    return (
        <div className={`bg-gray-800/50 p-6 rounded-2xl shadow-lg border ${currentStatus.border} transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-1 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-white mb-2">{task.title}</h4>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">{task.description}</p>
            
            <div className="border-t border-gray-700/50 pt-4 space-y-2 text-xs text-gray-400">
                <div className="flex items-center">
                    {currentStatus.icon}
                    <span className={`font-medium ${currentStatus.text}`}>{task.status}</span>
                </div>
                <p><span className="font-semibold">Assigned:</span> {task.createdAt}</p>
            </div>

            {!isCompleted && (
                <button
                    onClick={() => onComplete(task.id)}
                    className="mt-5 w-full flex items-center justify-center px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors text-sm font-semibold"
                >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Completed
                </button>
            )}
        </div>
    );
};


const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl max-w-sm w-full text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Confirm Logout</h3>
                <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition">Logout</button>
                </div>
            </div>
        </div>
    );
};


export default function UserDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    setTasks(storedTasks);
                }
            } catch (error) {
                console.error("Failed to parse data from localStorage", error);
            }
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleComplete = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId && task.assignedTo?.toLowerCase() === user.email?.toLowerCase()
                ? { ...task, status: 'Completed' }
                : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        toast.success('Task marked as complete!');
    };
  
    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success("You've been logged out.");
        setLogoutModalOpen(false);
        setTimeout(() => navigate('/'), 800);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-center p-4">
                <User className="w-16 h-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-gray-400 mb-6">Please log in to view your dashboard.</p>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                    Go to Login
                </button>
            </div>
        );
    }

    const userTasks = tasks.filter(
        (task) => task.assignedTo?.trim().toLowerCase() === user.email?.trim().toLowerCase()
    );

    return (
        <>
            <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
            <LogoutModal isOpen={isLogoutModalOpen} onConfirm={handleLogout} onCancel={() => setLogoutModalOpen(false)} />

            <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>

                <div className="relative z-10">
                    <header className="p-4 backdrop-blur-lg bg-gray-900/50 border-b border-gray-800/50">
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500/20 p-2 rounded-full border border-blue-400/30">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-200 hidden sm:block">
                                    Welcome, <span className="text-blue-400">{user.email}</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link to="/user-leaderboard" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-700 transition">
                                    <Trophy className="w-4 h-4 text-yellow-400"/>
                                    <span>Leaderboard</span>
                                </Link>
                                <button onClick={() => setLogoutModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600/80 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition">
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="p-6 max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Your Assigned Tasks</h2>
                        {userTasks.length === 0 ? (
                            <div className="text-center bg-gray-800/50 border border-gray-700/50 p-10 rounded-lg shadow-lg">
                                <Inbox className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white">All Clear!</h3>
                                <p className="text-gray-400 mt-2">You have no tasks assigned to you. Great job!</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {userTasks.map((task) => (
                                    <TaskCard key={task.id} task={task} onComplete={handleComplete} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};
