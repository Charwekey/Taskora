import React, { useEffect, useState } from 'react';
import api from './api';
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import TaskModal from './components/TaskModal';

const Dashboard = () => {
    const { logout, currentUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('tasks/');
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Failed to logout', err);
        }
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (currentTask) {
                await api.put(`tasks/${currentTask.id}/`, taskData);
            } else {
                await api.post('tasks/', taskData);
            }
            setIsModalOpen(false);
            fetchTasks();
        } catch (err) {
            console.error('Error saving task:', err);
            alert('Failed to save task. Ensure backend is running and accepts requests.');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`tasks/${id}/`);
                fetchTasks();
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    };

    const handleStatusToggle = async (task) => {
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        try {
            await api.patch(`tasks/${task.id}/`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const openNewTaskModal = () => {
        setCurrentTask(null);
        setIsModalOpen(true);
    };

    const openEditTaskModal = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    const getPriorityColor = (p) => {
        if (p === 'High') return 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20';
        if (p === 'Medium') return 'bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/20';
        return 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20';
    };

    const SkeletonLoader = () => (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="backdrop-blur-md bg-white/40 dark:bg-white/10 rounded-2xl p-5 border border-white/30 animate-pulse">
                    <div className="flex items-center space-x-4">
                        <div className="h-6 w-6 rounded-full bg-[#4A6565]/20"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-[#4A6565]/20 rounded-lg w-2/5"></div>
                            <div className="h-3 bg-[#4A6565]/10 rounded-lg w-1/4"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#7FA5A4] transition-colors duration-200">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 right-20 w-96 h-96 bg-[#C9A068]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 dark:bg-[#2B4544]/30 border-b border-white/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src="/Green and Beige Bold Eccentric Apparel Logo Design.png" alt="Taskora Logo" className="h-25 w-30 rounded-lg -my-6" style={{ maxWidth: 'none' }} />
                    </div>
                    <div className="flex items-center space-x-5">


                        <span className="text-[#4A6565] dark:text-[#A8C5C4] text-sm hidden sm:block font-medium">{currentUser?.email}</span>
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to log out?")) {
                                    handleLogout();
                                }
                            }}
                            className="text-[#4A6565] dark:text-[#A8C5C4] hover:text-[#C9A068] dark:hover:text-[#D4B078] font-medium text-sm transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-4xl font-bold text-[#2B3D3E] dark:text-white tracking-tight">
                            My Tasks
                        </h2>
                        <p className="text-[#4A6565] dark:text-[#A8C5C4] mt-2 text-lg">
                            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {filter !== 'All' ? filter.toLowerCase() : 'total'}
                        </p>
                    </div>
                    <button
                        onClick={openNewTaskModal}
                        className="inline-flex items-center px-6 py-3.5 rounded-2xl shadow-lg shadow-[#C9A068]/20 text-sm font-semibold text-white bg-[#C9A068] hover:bg-[#B8905A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Task
                    </button>
                </div>

                {/* Filters */}
                <div className="flex space-x-3 mb-8">
                    {['All', 'Pending', 'Completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${filter === f
                                ? 'bg-[#C9A068] text-white shadow-md shadow-[#C9A068]/20'
                                : 'bg-white/40 dark:bg-white/10 text-[#4A6565] dark:text-[#A8C5C4] border border-white/30 hover:bg-white/60 dark:hover:bg-white/20'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                {loading ? (
                    <SkeletonLoader />
                ) : (
                    <div className="space-y-3">
                        {filteredTasks.length === 0 ? (
                            <div className="backdrop-blur-md bg-white/40 dark:bg-white/10 rounded-3xl p-16 border border-white/30 text-center">
                                <div className="w-20 h-20 bg-[#C9A068]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-[#C9A068]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-[#4A6565] dark:text-[#A8C5C4] text-lg font-medium">No tasks found</p>
                                <p className="text-[#4A6565] dark:text-[#A8C5C4] text-sm mt-1">Time to relax or add a new task!</p>
                            </div>
                        ) : (
                            filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="backdrop-blur-md bg-white/40 dark:bg-white/10 rounded-2xl p-5 border border-white/30 hover:bg-white/50 dark:hover:bg-white/15 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center flex-1 min-w-0 space-x-4">
                                            <button
                                                onClick={() => handleStatusToggle(task)}
                                                className={`flex-shrink-0 h-7 w-7 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${task.status === 'Completed'
                                                    ? 'bg-[#C9A068] border-[#C9A068] shadow-md'
                                                    : 'border-[#4A6565]/30 dark:border-[#A8C5C4]/30 hover:border-[#C9A068]'
                                                    }`}
                                            >
                                                {task.status === 'Completed' && (
                                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className={`text-base font-semibold truncate transition-colors duration-200 ${task.status === 'Completed'
                                                        ? 'text-[#4A6565] dark:text-[#A8C5C4] line-through'
                                                        : 'text-[#2B3D3E] dark:text-white'
                                                        }`}>
                                                        {task.title}
                                                    </p>
                                                    <span className={`ml-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-4 text-sm text-[#4A6565] dark:text-[#A8C5C4]">
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Due {new Date(task.due_date).toLocaleDateString()}
                                                    </span>
                                                    {task.description && (
                                                        <span className="hidden md:block truncate max-w-md">{task.description}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-4 flex-shrink-0 flex items-center space-x-2 opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => openEditTaskModal(task)}
                                                className="text-[#4A6565] dark:text-[#A8C5C4] hover:text-[#C9A068] dark:hover:text-[#D4B078] cursor-pointer p-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/20 transition-all"
                                                title="Edit"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="text-[#4A6565] dark:text-[#A8C5C4] hover:text-red-500 cursor-pointer p-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/20 transition-all"
                                                title="Delete"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                taskToEdit={currentTask}
                onSave={handleSaveTask}
            />
        </div>
    );
};

export default Dashboard;