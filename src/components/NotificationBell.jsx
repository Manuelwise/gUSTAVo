import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { CheckCircle } from 'lucide-react'; // Import an icon
import axios from 'axios';

const NotificationBell = ({ 
    notificationCount, 
    notifications, 
    setNotifications, 
    isOpen, 
    setIsOpen 
}) => {
    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const markAsRead = async (id) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/notifications/notifications/${id}`, 
                { read: true },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
            );
            setNotifications(prev => prev.filter(n => n._id !== id));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    return (
        <div className="relative cursor-pointer">
            <button className="focus:outline-none" onClick={toggleDropdown}>
                <Bell size={24} />
                {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                        {notificationCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-100 bg-white shadow-lg rounded-md z-10">
                    <div className="py-2">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div 
                                    key={notification._id} 
                                    className="flex items-center px-4 py-2 text-black hover:bg-gray-100 relative"
                                >
                                    <div className={`flex-1 w-100 ${notification.isRead ? 'text-gray-500' : 'font-bold'} text-sm`}>
                                        {notification.message}
                                        {!notification.isRead && (
                                            <span className="absolute -top-1 -left-1 bg-red-500 text-white font-bold rounded-full px-2" style={{ fontSize: '0.5rem' }}>
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        className="absolute right-2 w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                                        onClick={() => markAsRead(notification._id)}
                                    >
                                        <CheckCircle size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">No notifications</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
