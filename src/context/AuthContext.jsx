// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [requests, setRequests] = useState([]);

    const isAuthenticated = !!token;

    // Login function
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            const { token, user} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('username', user.username);

            setToken(token);
            setUsername(user.username);
            console.log('Fetched username:',user.username);
            console.log('Fetched login data:',response.data);
            fetchRequests(token);  // Fetch immediately after login
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
        setRequests([]);
    };

    // Fetch only pending requests
    const fetchRequests = async (overrideToken = null) => {
        const activeToken = overrideToken || token;
        if (!activeToken) return;

        try {
            const response = await axios.get('http://localhost:5000/api/requests', {
                headers: { Authorization: `Bearer ${activeToken}` },
            });

            const pendingRequests = response.data.filter(request => request.status === 'pending');
            setRequests(pendingRequests);
        } catch (error) {
            console.error('Failed to fetch requests:', error);
        }
    };

    // Auto-fetch requests on login and refresh every 30 seconds
    useEffect(() => {
        if (token) {
            fetchRequests();

            const interval = setInterval(fetchRequests, 30000);  // Every 30 seconds
            return () => clearInterval(interval);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, username, requests, fetchRequests, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
