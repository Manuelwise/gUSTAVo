<<<<<<< HEAD
// AuthContext.jsx
=======
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role')); // Added role state
  const [notifications, setNotifications] = useState([]);

  const isAuthenticated = !!token;

  // ✅ Updated login returns user object and stores role
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role); // ✅ Store user role

      setToken(token);
      setUsername(user.username);
      setRole(user.role); // ✅ Set role state

      console.log('Fetched username:', user.username);
      console.log('Fetched role:', user.role);
      console.log('Fetched login data:', response.data);

      await fetchNotifications();

      return { success: true, user }; // ✅ important for redirect
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  };

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role'); // ✅ Remove role on logout
    setToken(null);
    setUsername(null);
    setRole(null); // ✅ Clear role state
    setNotifications([]);
  };

  // Fetch only pending requests
=======
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [notifications, setNotifications] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);


    const isAuthenticated = !!token;

    // Login function
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            const { token, user } = response.data;
    
            localStorage.setItem('token', token);
            localStorage.setItem('username', user.username);
    
            setToken(token);
            setUsername(user.username);
            console.log('Fetched username:', user.username);
            console.log('Fetched login data:', response.data);
            
            // Fetch requests and notifications immediately after login
            // fetchRequests(token);  
            await fetchNotifications(); // Fetch notifications after login
    
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };
    
const fetchNotifications = async () => {
    if (!token) return; // Check if token is available
    try {
        const response = await axios.get('http://localhost:5000/api/notifications', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
    } catch (err) {
        console.error('Failed to fetch notifications:', err);
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
        setNotifications([]);
    };

    // Fetch only pending requests
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
// const [fetching, setFetching] = useState(false);

// const fetchRequests = async (overrideToken = null) => {
//     const activeToken = overrideToken || token;
//     if (!activeToken || fetching) return; // Prevent fetching if already fetching

//     setFetching(true); // Set fetching to true
//     try {
//         const response = await axios.get('http://localhost:5000/api/requests', {
//             headers: { Authorization: `Bearer ${activeToken}` },
//         });
//         const pendingRequests = response.data.filter(request => request.status === 'pending');
//         setRequests(pendingRequests);
//     } catch (error) {
//         console.error('Failed to fetch requests:', error);
//     } finally {
//         setFetching(false); // Reset fetching state
//     }
// };

    // Auto-fetch requests on login and refresh every 30 seconds
//   useEffect(() => {
//       if (token) {
//           fetchRequests();
//           const interval = setInterval(fetchRequests, 30000); // Every 30 seconds
//           return () => clearInterval(interval); // Clear interval on unmount
//       }
//   }, [token]);

<<<<<<< HEAD
  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuthenticated, 
      username, 
      role, // ✅ Provide role in context
      notifications, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
=======
    return (
        <AuthContext.Provider value={{ token, isAuthenticated, username, notifications, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
