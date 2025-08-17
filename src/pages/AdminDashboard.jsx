import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { 
    LayoutDashboard, 
    Users, 
    Settings, 
    LogOut, 
    PlusCircle, 
    ListTodo, 
    Clock, 
    CheckCircle, 
    Loader,
    Trash2,
    AlertTriangle,
    Trophy
} from 'lucide-react';


const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "bg-yellow-500/20 text-yellow-400",
        Completed: "bg-green-500/20 text-green-400",
        'In Progress': "bg-blue-500/20 text-blue-400"
    };
    const icons = {
        Pending: <Clock className="w-3 h-3 mr-1.5" />,
        Completed: <CheckCircle className="w-3 h-3 mr-1.5" />,
        'In Progress': <Loader className="w-3 h-3 mr-1.5 animate-spin" />,
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center ${styles[status] || 'bg-gray-500/20 text-gray-400'}`}>
            {icons[status]}
            {status}
        </span>
    );
};

const StatCard = ({ title, value, icon, color }) => {
    const Icon = icon;
    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-sm text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
};

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl max-w-sm w-full text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition">Confirm</button>
                </div>
            </div>
        </div>
    );
};



export default function AdminDashboard() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            setTasks(storedTasks);
            setUsers(storedUsers.filter(u => u.role === 'user'));
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        toast.success('Task deleted successfully!');
        setModalState({ isOpen: false, type: null, data: null });
    };
  
    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success("You've been logged out.");
        setModalState({ isOpen: false, type: null, data: null });
        setTimeout(() => navigate('/'), 800);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'Pending').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Completed').length,
    };

    return (
        <>
            <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
            <ConfirmationModal 
                isOpen={modalState.isOpen}
                onCancel={() => setModalState({ isOpen: false, type: null, data: null })}
                onConfirm={() => {
                    if (modalState.type === 'deleteTask') handleDeleteTask(modalState.data);
                    if (modalState.type === 'logout') handleLogout();
                }}
                title={modalState.type === 'deleteTask' ? "Delete Task?" : "Confirm Logout"}
                message={modalState.type === 'deleteTask' ? "This action cannot be undone." : "Are you sure you want to log out?"}
            />

            <div className="relative min-h-screen flex bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>
                
                <aside className="relative z-10 w-64 bg-gray-900/50 p-5 flex flex-col justify-between border-r border-gray-800/50">
                    <div>
                        <h1 className="text-2xl font-bold mb-10 tracking-wider">SyncTask</h1>
                        <nav className="space-y-2">
                            <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg bg-gray-700/50"><LayoutDashboard className="w-5 h-5 mr-3"/>Dashboard</Link>
                            <Link to="/admin-users" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Users className="w-5 h-5 mr-3"/>Users</Link>
                            <Link to="/admin-settings" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Settings className="w-5 h-5 mr-3"/>Settings</Link>
                            <Link to="/leaderboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Trophy className="w-5 h-5 mr-3"/>Leaderboard</Link>
                        </nav>
                    </div>
                    <button onClick={() => setModalState({ isOpen: true, type: 'logout' })} className="flex items-center p-3 rounded-lg hover:bg-red-500/50 transition-colors w-full">
                        <LogOut className="w-5 h-5 mr-3"/>Logout
                    </button>
                </aside>

                <main className="relative z-10 flex-1 p-8 overflow-y-auto">
                    <header className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
                        <Link to="/assign-task" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition">
                            <PlusCircle className="w-5 h-5"/>
                            <span>Assign New Task</span>
                        </Link>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Tasks" value={taskStats.total} icon={ListTodo} color="bg-blue-500" />
                        <StatCard title="Pending" value={taskStats.pending} icon={Clock} color="bg-yellow-500" />
                        <StatCard title="In Progress" value={taskStats.inProgress} icon={Loader} color="bg-indigo-500" />
                        <StatCard title="Completed" value={taskStats.completed} icon={CheckCircle} color="bg-green-500" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-4">All Tasks</h3>
                            {tasks.length === 0 ? (
                                <div className="text-center py-10">
                                    <ListTodo className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold text-gray-300">No tasks yet</h4>
                                    <p className="text-gray-500 mb-4">Get started by assigning the first task.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="p-4 text-sm font-semibold text-gray-400">Assigned To</th>
                                                <th className="p-4 text-sm font-semibold text-gray-400">Task</th>
                                                <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                                                <th className="p-4 text-sm font-semibold text-gray-400">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((t) => (
                                                <tr key={t.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                                    <td className="p-4 flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/30 text-blue-400 flex items-center justify-center font-bold mr-3">
                                                            {t.assignedTo.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-gray-300">{t.assignedTo}</span>
                                                    </td>
                                                    <td className="p-4 text-gray-300">{t.title}</td>
                                                    <td className="p-4"><StatusBadge status={t.status} /></td>
                                                    <td className="p-4 text-center">
                                                        <button 
                                                            onClick={() => setModalState({ isOpen: true, type: 'deleteTask', data: t.id })}
                                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/20 rounded-full transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                             <h3 className="text-xl font-bold text-white mb-6">Task Distribution</h3>
                             <div className="space-y-4">
                                {['Pending', 'In Progress', 'Completed'].map(status => {
                                    const count = taskStats[status.toLowerCase().replace(' ', '')];
                                    const percentage = taskStats.total > 0 ? (count / taskStats.total) * 100 : 0;
                                    const color = status === 'Pending' ? 'bg-yellow-500' : status === 'In Progress' ? 'bg-indigo-500' : 'bg-green-500';
                                    return (
                                        <div key={status}>
                                            <div className="flex justify-between items-center mb-1 text-sm">
                                                <span className="font-medium text-gray-300">{status}</span>
                                                <span className="text-gray-400">{count} / {taskStats.total}</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{width: `${percentage}%`}}></div>
                                            </div>
                                        </div>
                                    )
                                })}
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
