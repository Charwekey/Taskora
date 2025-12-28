import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import api from '../api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        // 1. Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // 2. Create user in Backend (Sync)
        const username = email.split('@')[0];
        try {
            await api.post('auth/register/', {
                username: username,
                email: email,
                password: password
            });
            // Immediately login to backend to get the token
            const response = await api.post('auth/login/', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error("Backend registration failed:", error);
            // Try logging in anyway in case user existed
            try {
                const response = await api.post('auth/login/', {
                    username: username,
                    password: password
                });
                localStorage.setItem('token', response.data.token);
            } catch (loginErr) {
                console.error("Backend login also failed:", loginErr);
                throw new Error("Account created in Firebase but failed to sync with Backend.");
            }
        }

        return userCredential;
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const email = user.email;
            const username = email.split('@')[0];

            // Sync with Backend
            try {
                // Try to login first (assuming user might exist)
                const response = await api.post('auth/login/', {
                    username: username,
                    password: `GoogleAuth_${user.uid}`
                });
                localStorage.setItem('token', response.data.token);
            } catch (error) {
                // Login failed, likely because user doesn't exist or password mismatch
                const dummyPassword = `GoogleAuth_${user.uid}`;

                try {
                    // Try register
                    await api.post('auth/register/', {
                        username: username,
                        email: email,
                        password: dummyPassword
                    });
                    // Then login
                    const response = await api.post('auth/login/', {
                        username: username,
                        password: dummyPassword
                    });
                    localStorage.setItem('token', response.data.token);

                } catch (regError) {
                    // Fallback: Try login one more time if registration failed (maybe user exists)
                    try {
                        const response = await api.post('auth/login/', {
                            username: username,
                            password: dummyPassword
                        });
                        localStorage.setItem('token', response.data.token);
                    } catch (finalErr) {
                        console.error("Backend Google Sync Failed:", finalErr);
                        throw new Error("Could not sync Google User with Backend.");
                    }
                }
            }
            return result;
        } catch (error) {
            console.error("Google Sign In Failed", error);
            throw error;
        }
    }

    async function login(email, password) {
        // 1. Login to Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // 2. Login to Backend to get Token
        const username = email.split('@')[0];

        try {
            const response = await api.post('auth/login/', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error("Backend login failed:", error);
            throw new Error("Logged in to Firebase but failed to authenticate with Backend.");
        }

        return userCredential;
    }

    async function logout() {
        try {
            await api.post('auth/logout/');
        } catch (e) {
            console.warn("Backend logout failed", e);
        }
        localStorage.removeItem('token');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
