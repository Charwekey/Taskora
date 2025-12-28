import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title || '');
            setDescription(taskToEdit.description || '');
            if (taskToEdit.due_date) {
                const date = new Date(taskToEdit.due_date);
                if (!isNaN(date.getTime())) {
                    const offset = date.getTimezoneOffset() * 60000;
                    const localISOTime = (new Date(date - offset)).toISOString().slice(0, 16);
                    setDueDate(localISOTime);
                }
            } else {
                setDueDate('');
            }
            setPriority(taskToEdit.priority || 'Medium');
            setStatus(taskToEdit.status || 'Pending');
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Medium');
            setStatus('Pending');
        }
        setError('');
    }, [taskToEdit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            setError('Please fill in required fields');
            return;
        }

        onSave({
            title,
            description,
            due_date: new Date(dueDate).toISOString(),
            priority,
            status
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 bg-[#2B3D3E]/60 backdrop-blur-sm transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative backdrop-blur-md bg-white/50 dark:bg-[#2B4544]/50 border border-white/30 rounded-3xl shadow-2xl w-full max-w-lg mx-auto z-10 overflow-hidden transform transition-all">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-[#2B3D3E] dark:text-white">
                            {taskToEdit ? 'Edit Task' : 'Create New Task'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-[#4A6565] dark:text-[#A8C5C4] hover:text-[#2B3D3E] dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {error && (
                        <div className="mt-4 backdrop-blur-sm bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 p-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* Form */}
                <form id="task-form" onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-[#2B3D3E] dark:text-white mb-2">
                            Task Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] dark:text-white placeholder-[#4A6565]/50 dark:placeholder-[#A8C5C4]/50 transition-all duration-200 outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="What needs to be done?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#2B3D3E] dark:text-white mb-2">
                            Description
                        </label>
                        <textarea
                            className="block w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] dark:text-white placeholder-[#4A6565]/50 dark:placeholder-[#A8C5C4]/50 transition-all duration-200 outline-none resize-none"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add more details..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#2B3D3E] dark:text-white mb-2">
                                Due Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                className="block w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] dark:text-white transition-all duration-200 outline-none"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#2B3D3E] dark:text-white mb-2">
                                Priority
                            </label>
                            <select
                                className="block w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] dark:text-white transition-all duration-200 outline-none cursor-pointer"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    {taskToEdit && (
                        <div>
                            <label className="block text-sm font-semibold text-[#2B3D3E] dark:text-white mb-2">
                                Status
                            </label>
                            <select
                                className="block w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] dark:text-white transition-all duration-200 outline-none cursor-pointer"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    )}
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/20 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button
                        type="button"
                        className="px-6 py-3 rounded-xl border border-white/40 bg-white/60 dark:bg-white/10 backdrop-blur-sm text-[#2B3D3E] dark:text-white font-semibold hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-200"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="task-form"
                        className="px-6 py-3 rounded-xl bg-[#C9A068] text-white font-semibold hover:bg-[#B8905A] focus:outline-none focus:ring-4 focus:ring-[#C9A068]/20 shadow-lg shadow-[#C9A068]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                        {taskToEdit ? 'Update Task' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;