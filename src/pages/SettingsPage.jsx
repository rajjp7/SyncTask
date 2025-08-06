import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { 
    LayoutDashboard, 
    Users, 
    Settings, 
    LogOut, 
    ShieldCheck, 
    User as UserIcon,
    Loader,
    Trash2,
    Edit,
    AlertTriangle,
    X,
    Trophy
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

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, user, type }) => {
    if (!isOpen) return null;
    const isDelete = type === 'delete';
    const title = isDelete ? "Delete User?" : "Confirm Logout";
    const message = isDelete 
        ? <>Are you sure you want to delete <strong className="text-white">{user?.email}</strong>? This action is irreversible.</>
        : "Are you sure you want to log out?";
    const confirmText = isDelete ? "Delete" : "Logout";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl max-w-sm w-full text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition">{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

const EditUserModal = ({ isOpen, onSave, onCancel, user }) => {
    const [role, setRole] = useState(user?.role || 'user');

    useEffect(() => {
        setRole(user?.role || 'user');
    }, [user]);

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl max-w-md w-full relative">
                <button onClick={onCancel} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition">
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold text-white mb-2">Edit User</h3>
                <p className="text-gray-400 mb-6">Editing role for <strong className="text-blue-400">{user.email}</strong></p>
                
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">User Role</label>
                    <select
                        id="role" value={role} onChange={(e) => setRole(e.target.value)}
                        className="w-full py-3 px-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">Cancel</button>
                    <button onClick={() => onSave(user.email, role)} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition">Save Changes</button>
                </div>
            </div>
        </div>
    );
};



export default function SettingsPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalState, setModalState] = useState({ type: null, user: null });
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            try {
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                setUsers(storedUsers);
            } catch (error) {
                console.error("Failed to parse users from localStorage", error);
            }
            setIsLoading(false);
        }, 1000);
    }, []);

    const openModal = (type, user = null) => setModalState({ type, user });
    const closeModal = () => setModalState({ type: null, user: null });

    const handleEditUser = (email, newRole) => {
        const updatedUsers = users.map(u => u.email === email ? { ...u, role: newRole } : u);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        toast.success(`User ${email} updated successfully.`);
        closeModal();
    };

    const handleDeleteUser = () => {
        const userToDelete = modalState.user;
        const updatedUsers = users.filter(u => u.email !== userToDelete.email);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        toast.success(`User ${userToDelete.email} has been deleted.`);
        closeModal();
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success("You've been logged out.");
        closeModal();
        setTimeout(() => navigate('/'), 800);
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
            <ConfirmationModal 
                isOpen={modalState.type === 'delete' || modalState.type === 'logout'}
                onConfirm={modalState.type === 'delete' ? handleDeleteUser : handleLogout}
                onCancel={closeModal}
                user={modalState.user}
                type={modalState.type}
            />
            <EditUserModal isOpen={modalState.type === 'edit'} onSave={handleEditUser} onCancel={closeModal} user={modalState.user} />

            <div className="relative min-h-screen flex bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>
                
                <aside className="relative z-10 w-64 bg-gray-900/50 p-5 flex flex-col justify-between border-r border-gray-800/50">
                    <div>
                        <h1 className="text-2xl font-bold mb-10 tracking-wider">SyncTask</h1>
                        <nav className="space-y-2">
                            <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><LayoutDashboard className="w-5 h-5 mr-3"/>Dashboard</Link>
                            <Link to="/admin-users" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Users className="w-5 h-5 mr-3"/>Users</Link>
                            <Link to="/admin-settings" className="flex items-center p-3 rounded-lg bg-gray-700/50"><Settings className="w-5 h-5 mr-3"/>Settings</Link>
                            <Link to="/leaderboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors"><Trophy className="w-5 h-5 mr-3"/>Leaderboard</Link>
                        </nav>
                    </div>
                    <button onClick={() => openModal('logout')} className="flex items-center p-3 rounded-lg hover:bg-red-500/50 transition-colors w-full">
                        <LogOut className="w-5 h-5 mr-3"/>Logout
                    </button>
                </aside>

                <main className="relative z-10 flex-1 p-8 overflow-y-auto">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-white">Settings & User Roles</h2>
                        <p className="text-gray-400 mt-1">Manage user roles and perform administrative actions.</p>
                    </header>

                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="p-4 text-sm font-semibold text-gray-400">User</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400">Role</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.email} className="border-b border-gray-800 hover:bg-gray-800/50">
                                            <td className="p-4 flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/30 text-blue-400 flex items-center justify-center font-bold mr-4">
                                                    {user.email.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-300">{user.email}</span>
                                            </td>
                                            <td className="p-4"><RoleBadge role={user.role} /></td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openModal('edit', user)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-full transition" title="Edit User">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => openModal('delete', user)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-full transition" title="Delete User">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
