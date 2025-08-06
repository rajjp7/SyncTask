import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { 
    LayoutDashboard, 
    Users, 
    Settings, 
    LogOut, 
    ShieldCheck, 
    User as UserIcon,
    Loader,
    Trophy,
    Award,
    Star,
    AlertTriangle
} from 'lucide-react';



const RoleBadge = ({ role }) => {
    const styles = {
        admin: "bg-purple-500/20 text-purple-400",
        user: "bg-gray-500/20 text-gray-400",
    };
    const icons = {
        admin: <ShieldCheck className="w-3 h-3 mr-1.5" />,
        user: <UserIcon className="w-3 h-3 mr-1.5" />,
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center ${styles[role] || styles.user}`}>
            {icons[role]}
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
    );
};

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
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

const motivationalQuotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The secret of getting ahead is getting started.",
    "Perfection is not attainable, but if we chase perfection we can catch excellence."
];


export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setQuote] = useState('');
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            try {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

                const userTasks = users
                    .filter(u => u.role === 'user')
                    .map(user => {
                        const completedTasks = tasks.filter(task =>
                            task.assignedTo?.toLowerCase() === user.email?.toLowerCase() && task.status === 'Completed'
                        ).length;
                        return { ...user, completedTasks };
                    });

                userTasks.sort((a, b) => b.completedTasks - a.completedTasks);
                setLeaderboard(userTasks);
            } catch (error) {
                console.error("Failed to process leaderboard data", error);
            }
            setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setLogoutModalOpen(false);
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    const topPerformer = leaderboard[0];
    const otherPerformers = leaderboard.slice(1);

    return (
        <>
            <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
            <ConfirmationModal isOpen={isLogoutModalOpen} onConfirm={handleLogout} onCancel={() => setLogoutModalOpen(false)} />

            <div className="relative min-h-screen flex bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>
                
                <aside className="relative z-10 w-64 bg-gray-900/50 p-5 flex flex-col justify-between border-r border-gray-800/50">
                    <div>
                        <h1 className="text-2xl font-bold mb-10 tracking-wider">SyncTask</h1>
                        <nav className="space-y-2">
                            <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><LayoutDashboard className="w-5 h-5 mr-3"/>Dashboard</Link>
                            <Link to="/admin-users" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Users className="w-5 h-5 mr-3"/>Users</Link>
                            <Link to="/admin-settings" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Settings className="w-5 h-5 mr-3"/>Settings</Link>
                            <Link to="/leaderboard" className="flex items-center p-3 rounded-lg bg-gray-700/50"><Trophy className="w-5 h-5 mr-3"/>Leaderboard</Link>
                        </nav>
                    </div>
                    <button onClick={() => setLogoutModalOpen(true)} className="flex items-center p-3 rounded-lg hover:bg-red-500/50 transition-colors w-full">
                        <LogOut className="w-5 h-5 mr-3"/>Logout
                    </button>
                </aside>

                <main className="relative z-10 flex-1 p-8 overflow-y-auto">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <Trophy className="w-8 h-8 mr-3 text-yellow-400"/>
                            Employee Leaderboard
                        </h2>
                        <p className="text-gray-400 mt-1">Celebrating top performers and their achievements.</p>
                    </header>

                    {topPerformer && topPerformer.completedTasks > 0 ? (
                        <div className="mb-8 bg-gray-800/50 border border-yellow-500/50 p-8 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
                            <div className="relative">
                                <Award className="w-24 h-24 text-yellow-400" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900">1</span>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-yellow-400">Top Performer</p>
                                <h3 className="text-3xl font-bold">{topPerformer.email}</h3>
                                <p className="text-xl mt-1">{topPerformer.completedTasks} Tasks Completed</p>
                            </div>
                        </div>
                    ) : null}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-4">Rankings</h3>
                            {leaderboard.length === 0 || leaderboard.every(u => u.completedTasks === 0) ? (
                                <div className="text-center py-10">
                                    <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold text-gray-300">No Completed Tasks Yet</h4>
                                    <p className="text-gray-500">The leaderboard will populate as users complete their tasks.</p>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {otherPerformers.map((user, index) => (
                                        <li key={user.email} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition">
                                            <div className="flex items-center">
                                                <span className="text-xl font-bold text-gray-500 w-8">{index + 2}</span>
                                                <div className="w-10 h-10 rounded-full bg-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold ml-4 mr-4">
                                                    {user.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-300">{user.email}</p>
                                                    <RoleBadge role={user.role} />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-blue-400">{user.completedTasks}</p>
                                                <p className="text-xs text-gray-500">Tasks Done</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                            <Star className="w-10 h-10 text-yellow-400 mb-4" />
                            <h4 className="text-lg font-bold text-white mb-2">Quote of the Day</h4>
                            <p className="text-gray-400 italic">"{quote}"</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
