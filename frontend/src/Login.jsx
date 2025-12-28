


import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, loginWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login Error:", err);
            setError('Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
        } catch (err) {
            console.error("Google Sign In Error:", err);
            setError('Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#7FA5A4] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-[#C9A068]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
            </div>

            {/* Main container */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo and back link */}
                <div className="mb-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 text-[#2B3D3E] hover:text-[#4A6565] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <img src="/Green and Beige Bold Eccentric Apparel Logo Design.png" alt="Taskora Logo" className="h-25 w-30 rounded-lg -my-6" style={{ maxWidth: 'none' }} />
                    </div>
                </div>

                {/* Login card */}
                <div className="backdrop-blur-md bg-white/40 rounded-3xl p-8 md:p-10 border border-white/30 shadow-2xl">
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-[#2B3D3E]">
                                Welcome back
                            </h2>
                            <p className="text-[#4A6565]">
                                Pick up right where you left off
                            </p>
                        </div>

                        {error && (
                            <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#2B3D3E] mb-2">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] placeholder-[#4A6565]/50 transition-all duration-200 outline-none"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-[#2B3D3E] mb-2">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 focus:border-[#C9A068] focus:bg-white/80 focus:ring-2 focus:ring-[#C9A068]/20 text-[#2B3D3E] placeholder-[#4A6565]/50 transition-all duration-200 outline-none"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button type="button" className="text-sm text-[#4A6565] hover:text-[#2B3D3E] transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 rounded-xl text-white bg-[#C9A068] hover:bg-[#B8905A] focus:outline-none focus:ring-4 focus:ring-[#C9A068]/20 transition-all duration-200 font-medium shadow-lg shadow-[#C9A068]/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#4A6565]/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white/40 backdrop-blur-sm rounded-full text-[#4A6565]">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full flex justify-center items-center space-x-3 py-3.5 px-4 rounded-xl border border-white/40 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 font-medium text-[#2B3D3E] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </form>

                        <div className="pt-6 border-t border-white/20">
                            <p className="text-center text-[#4A6565]">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-semibold text-[#C9A068] hover:text-[#B8905A] transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative element */}
                <div className="mt-8 text-center">
                    <p className="text-[#4A6565] text-sm">
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;