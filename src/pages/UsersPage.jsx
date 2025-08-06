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
    CheckCircle
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

const UserCard = ({ user, tasks }) => {
    const assignedTasks = tasks.filter(task => task.assignedTo?.toLowerCase() === user.email?.toLowerCase());
    const completedTasks = assignedTasks.filter(task => task.status === 'Completed').length;
    const progress = assignedTasks.length > 0 ? (completedTasks / assignedTasks.length) * 100 : 0;

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-1">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/30 text-blue-400 flex items-center justify-center font-bold mr-4 text-xl">
                    {user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-white truncate">{user.email}</p>
                    <RoleBadge role={user.role} />
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-gray-300">Task Progress</span>
                        <span className="text-gray-400">{completedTasks} / {assignedTasks.length}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    <span>{completedTasks} task(s) completed</span>
                </div>
            </div>
        </div>
    );
};




export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            try {
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                // Filter out admin users before setting the state
                const regularUsers = storedUsers.filter(user => user.role === 'user');
                setUsers(regularUsers);
                setTasks(storedTasks);
            } catch (error) {
                console.error("Failed to parse data from localStorage", error);
            }
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleLogout = () => {
    
        localStorage.removeItem('user');
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
            <div className="relative min-h-screen flex bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>
                
                <aside className="relative z-10 w-64 bg-gray-900/50 p-5 flex flex-col justify-between border-r border-gray-800/50">
                    <div>
                        <h1 className="text-2xl font-bold mb-10 tracking-wider">SyncTask</h1>
                        <nav className="space-y-2">
                            <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><LayoutDashboard className="w-5 h-5 mr-3"/>Dashboard</Link>
                            <Link to="/admin-users" className="flex items-center p-3 rounded-lg bg-gray-700/50"><Users className="w-5 h-5 mr-3"/>Users</Link>
                            <Link to="/admin-settings" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Settings className="w-5 h-5 mr-3"/>Settings</Link>
                            <Link to="/leaderboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Trophy className="w-5 h-5 mr-3"/>Leaderboard</Link>
                        </nav>
                    </div>
                    <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-red-500/50 transition-colors w-full">
                        <LogOut className="w-5 h-5 mr-3"/>Logout
                    </button>
                </aside>

                <main className="relative z-10 flex-1 p-8 overflow-y-auto">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-white">User Management</h2>
                        <p className="text-gray-400 mt-1">View all registered users and their task performance.</p>
                    </header>

                    {users.length === 0 ? (
                        <div className="text-center py-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-gray-300">No Users Found</h4>
                            <p className="text-gray-500">There are no registered users in the system yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((user) => (
                                <UserCard key={user.email} user={user} tasks={tasks} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};
