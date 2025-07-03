import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import NotificationBell from '../components/NotificationBell';
import axios from 'axios';

const Navbar = () => {
    const { isAuthenticated, logout, username, token, } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const bellRef = useRef(null);
    const adminButtonRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hasShadow, setHasShadow] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);


    useEffect(() => {
        const fetchNotifications = async () => {
            if (!isAuthenticated) return; // Only fetch if authenticated
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://localhost:5000/api/notifications/unread', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (Array.isArray(response.data.data)) {
                    setNotifications(response.data.data); // Set notifications to the data array
                } else {
                    console.error('Expected an array but received:', response.data.data);
                    setNotifications([]); // Handle unexpected response
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
                setNotifications([]); // Handle error case
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchNotifications();
    }, [isAuthenticated, token]); // Keep this dependency

    // if (loading) return <p>Loading notifications...</p>;
    // if (error) return <p className="text-red-500">{error}</p>;

     // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            bellRef.current && !bellRef.current.contains(event.target) &&
            adminButtonRef.current && !adminButtonRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
            setNotifDropdownOpen(false); // Close notification dropdown as well
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });


    return (
        <nav className={`fixed top-0 left-0 w-full bg-yellow-500 text-white z-50 transition-shadow duration-300 ${hasShadow ? 'shadow-lg' : ''}`}>
            <div className="container mx-auto px-2">
                <div className="flex justify-between items-center h-16">
                    {/* Left Side - Logo and Links */}
                    <div className="flex items-center space-x-8">
                    
                        <Link to="/">
                            <img src={logo} alt="GNPC Logo" className="h-20" />
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            <Link to="/" className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-yellow-600' : 'hover:bg-gray-400'}`}>
                                Home
                            </Link>
                            <Link to="/request" className={`px-3 py-2 rounded-md ${location.pathname === '/request' ? 'bg-yellow-600' : 'hover:bg-gray-400'}`}>
                                Request Files
                            </Link>
                            <Link to="/admin/dashboard" className={`px-3 py-2 rounded-md ${location.pathname === '/admin/dashboard' ? 'bg-yellow-600' : 'hover:bg-gray-400'}`}>
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Time, Notifications, User Dropdown */}
                    <div className="flex items-center space-x-6">
                        <span className="text-sm font-semibold">{formattedTime}</span>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4 cursor-pointer">     
                                {/* Notification Bell - Show count of pending requests */}
                                <div ref={bellRef}>
                                <NotificationBell 
                                    notificationCount={notifications.filter(n => !n.isRead).length} 
                                    notifications={notifications} 
                                    setNotifications={setNotifications}
                                    isOpen={notifDropdownOpen}
                                    setIsOpen={setNotifDropdownOpen}
                                />
                                </div>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                <div 
                                    className="flex items-center space-x-2 cursor-pointer" 
                                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                                    ref={adminButtonRef}
                                >
                                    <FaUserCircle size={24} />
                                    <span>{username || 'Admin'}</span>
                                </div>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                                    <Link to="/admin/new-user" className="block px-4 py-2 hover:bg-gray-100">
                                        Add New User
                                    </Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Logout
                                    </button>
                                    </div>
                                )}
                                </div>
                            </div>
                        ) : (
                            <Link to="/admin/login" className="bg-white text-yellow-600 px-4 py-2 rounded hover:bg-yellow-100">
<<<<<<< HEAD
                                Login
=======
                                Admin Login
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;