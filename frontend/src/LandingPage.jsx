import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { currentUser } = useAuth();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.3}px)`,
    };

    return (
        <div className="min-h-screen bg-[#7FA5A4] overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
                <div className="max-w-7xl mx-auto">
                    <div className="backdrop-blur-md bg-white/30 rounded-2xl px-8 py-4 border border-white/20 shadow-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 relative">
                                <img src="/Green and Beige Bold Eccentric Apparel Logo Design.png" alt="Taskora Logo" className="h-25 w-30 rounded-lg -my-6" style={{ maxWidth: 'none' }} />

                            </div>
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#how" className="text-[#4A6565] hover:text-[#2B3D3E] transition-colors font-medium">How it Works</a>
                            </div>
                            <div className="flex items-center space-x-4">

                                {!currentUser ? (
                                    <>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="text-[#4A6565] hover:text-[#2B3D3E] font-medium transition-colors"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={() => navigate('/register')}
                                            className="px-6 py-2.5 bg-[#C9A068] text-white rounded-xl hover:bg-[#B8905A] transition-all shadow-md hover:shadow-lg"
                                        >
                                            Get Started
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="px-6 py-2.5 bg-[#C9A068] text-white rounded-xl hover:bg-[#B8905A] transition-all shadow-md hover:shadow-lg"
                                    >
                                        Dashboard
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-[#C9A068]/10 rounded-full blur-3xl" style={parallaxStyle}></div>
                    <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/30">
                            <span className="text-[#4A6565] text-sm font-medium">Your productivity companion</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2B3D3E] leading-tight">
                            Tasks that feel
                            <span className="block mt-2 bg-gradient-to-r from-[#C9A068] to-[#5C8584] bg-clip-text text-transparent">
                                less like work
                            </span>
                        </h1>
                        <p className="text-lg text-[#4A6565] leading-relaxed max-w-lg">
                            A thoughtful space to organize your day. Simple enough to start right away, powerful enough to grow with you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {currentUser ? (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="px-8 py-4 bg-[#C9A068] text-white rounded-2xl hover:bg-[#B8905A] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-medium"
                                >
                                    Open Dashboard
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="px-8 py-4 bg-[#C9A068] text-white rounded-2xl hover:bg-[#B8905A] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-medium"
                                    >
                                        Start for Free
                                    </button>
                                    <button className="px-8 py-4 bg-white/50 backdrop-blur-sm text-[#2B3D3E] rounded-2xl hover:bg-white/70 transition-all border border-white/30 font-medium">
                                        Watch Demo
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="flex items-center space-x-8 pt-4">
                            <div>
                                <div className="text-2xl font-bold text-[#2B3D3E]">10k+</div>
                                <div className="text-sm text-[#4A6565]">Active users</div>
                            </div>
                            <div className="w-px h-12 bg-[#4A6565]/20"></div>
                            <div>
                                <div className="text-2xl font-bold text-[#2B3D3E]">98%</div>
                                <div className="text-sm text-[#4A6565]">Satisfaction</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="backdrop-blur-md bg-white/40 rounded-3xl p-8 border border-white/30 shadow-2xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b border-[#4A6565]/10">
                                    <span className="text-[#2B3D3E] font-semibold">Today's Tasks</span>
                                    <span className="text-[#4A6565] text-sm">3 of 5 done</span>
                                </div>
                                {[
                                    { title: 'Morning meditation', done: true, time: '8:00 AM' },
                                    { title: 'Team standup', done: true, time: '10:00 AM' },
                                    { title: 'Finish proposal', done: true, time: '2:00 PM' },
                                    { title: 'Grocery shopping', done: false, time: '6:00 PM' },
                                    { title: 'Evening walk', done: false, time: '7:30 PM' }
                                ].map((task, i) => (
                                    <div key={i} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/30 transition-colors">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${task.done ? 'bg-[#C9A068] border-[#C9A068]' : 'border-[#4A6565]/30'
                                            }`}>
                                            {task.done && (
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-medium ${task.done ? 'text-[#4A6565] line-through' : 'text-[#2B3D3E]'}`}>
                                                {task.title}
                                            </div>
                                            <div className="text-sm text-[#4A6565]">{task.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C9A068]/20 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="backdrop-blur-md bg-gradient-to-br from-[#C9A068]/30 to-[#5C8584]/30 rounded-3xl p-12 border border-white/30 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2B3D3E] mb-6">
                                Ready to feel organized?
                            </h2>
                            <p className="text-lg text-[#4A6565] mb-8 max-w-2xl mx-auto">
                                Join thousands who've already simplified their day. No credit card needed.
                            </p>
                            <button className="px-10 py-4 bg-[#C9A068] text-white rounded-2xl hover:bg-[#B8905A] transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 font-medium text-lg">
                                Get Started Free
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <img src="/Green and Beige Bold Eccentric Apparel Logo Design.png" alt="Taskora Logo" className="h-25 w-30 rounded-lg -my-6" style={{ maxWidth: 'none' }} />
                        </div>
                        <div className="flex space-x-8">
                            <a href="#" className="text-[#4A6565] hover:text-[#2B3D3E] transition-colors">Privacy</a>
                            <a href="#" className="text-[#4A6565] hover:text-[#2B3D3E] transition-colors">Terms</a>
                            <a href="#" className="text-[#4A6565] hover:text-[#2B3D3E] transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-[#4A6565] text-sm">
                        © 2025 Taskora. All rights reserved. Built by Queen of Aesthetics.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;