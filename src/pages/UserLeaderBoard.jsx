import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, Star, Loader, ArrowLeft, User as UserIcon, TrendingUp, Shield } from 'lucide-react';

const motivationalQuotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The secret of getting ahead is getting started.",
    "Perfection is not attainable, but if we chase perfection we can catch excellence."
];

const UserLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        setTimeout(() => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem('user'));
                const allUsers = JSON.parse(localStorage.getItem('users')) || [];
                const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

                if (loggedInUser) {
                    setCurrentUser(loggedInUser);
                }

                const userTasks = allUsers
                    .filter(u => u.role === 'user')
                    .map((user, index) => {
                        const completedTasks = allTasks.filter(task =>
                            task.assignedTo?.toLowerCase() === user.email?.toLowerCase() && task.status === 'Completed'
                        ).length;
                        return { ...user, completedTasks, rank: 0 }; // rank will be assigned after sorting
                    });

                userTasks.sort((a, b) => b.completedTasks - a.completedTasks);
                
            
                const rankedUsers = userTasks.map((user, index) => ({ ...user, rank: index + 1 }));

                setLeaderboard(rankedUsers);
            } catch (error) {
                console.error("Failed to process leaderboard data", error);
            }
            setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    const topPerformer = leaderboard[0];
    
    const currentUserData = currentUser ? leaderboard.find(u => u.email === currentUser.email) : null;
    const userToBeat = currentUserData && currentUserData.rank > 1 ? leaderboard[currentUserData.rank - 2] : null;

    return (
        <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/30 to-purple-900/30 animate-gradient-xy"></div>
            <div className="relative z-10">
                <header className="p-4 backdrop-blur-lg bg-gray-900/50 border-b border-gray-800/50">
                    <div className="max-w-7xl mx-auto flex items-center">
                        <Link to="/user-dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-700 transition">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                </header>

                <main className="p-6 max-w-7xl mx-auto">
                    <header className="mb-8 text-center">
                        <h2 className="text-4xl font-bold text-white flex items-center justify-center">
                            <Trophy className="w-10 h-10 mr-3 text-yellow-400"/>
                            Team Leaderboard
                        </h2>
                        <p className="text-gray-400 mt-2">See how you stack up against your peers!</p>
                    </header>

                    {currentUserData && (
                         <div className="mb-8 bg-gray-800/50 border border-blue-500/50 p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                            <div className="relative">
                                <Shield className="w-20 h-20 text-blue-400" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">{currentUserData.rank}</span>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-blue-400">Your Current Rank</p>
                                <h3 className="text-3xl font-bold">{currentUserData.email}</h3>
                                <p className="text-xl mt-1">{currentUserData.completedTasks} Tasks Completed</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50">
                            <h3 className="text-xl font-bold text-white mb-4">Rankings</h3>
                            {leaderboard.length === 0 || leaderboard.every(u => u.completedTasks === 0) ? (
                                <div className="text-center py-10">
                                    <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold text-gray-300">The Race Hasn't Started!</h4>
                                    <p className="text-gray-500">Complete tasks to see your name on the leaderboard.</p>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {leaderboard.map((user, index) => {
                                        const isCurrentUser = user.email === currentUser?.email;
                                        const isTopPerformer = index === 0;
                                        return (
                                            <li key={user.email} className={`flex items-center justify-between p-4 rounded-lg transition ${isCurrentUser ? 'bg-blue-600/30 border-2 border-blue-500' : 'bg-gray-900/50 hover:bg-gray-900'}`}>
                                                <div className="flex items-center">
                                                    <span className={`text-xl font-bold w-8 ${isTopPerformer ? 'text-yellow-400' : 'text-gray-500'}`}>{index + 1}</span>
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ml-4 mr-4 ${isTopPerformer ? 'bg-yellow-500/30 text-yellow-400' : 'bg-indigo-500/30 text-indigo-400'}`}>
                                                        {user.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <p className={`font-semibold ${isCurrentUser ? 'text-white' : 'text-gray-300'}`}>{user.email} {isCurrentUser && '(You)'}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-bold ${isTopPerformer ? 'text-yellow-400' : 'text-blue-400'}`}>{user.completedTasks}</p>
                                                    <p className="text-xs text-gray-500">Tasks Done</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>
                        <div className="space-y-8">
                            
                            {userToBeat && (
                                <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center justify-center text-center">
                                    <TrendingUp className="w-10 h-10 text-green-400 mb-4" />
                                    <h4 className="text-lg font-bold text-white mb-2">Next In Sight</h4>
                                    <p className="text-gray-400">You're only <strong className="text-white">{userToBeat.completedTasks - currentUserData.completedTasks}</strong> task(s) behind <strong className="text-white">{userToBeat.email}</strong>!</p>
                                </div>
                            )}
                         
                            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center justify-center text-center">
                                <Star className="w-10 h-10 text-yellow-400 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">Quote of the Day</h4>
                                <p className="text-gray-400 italic">"{quote}"</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserLeaderboard;
