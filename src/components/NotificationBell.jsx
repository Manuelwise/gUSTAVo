// components/NotificationBell.js
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = ({ notificationCount }) => {
    return (
        <div className="relative cursor-pointer">
            <Bell size={24} />
            {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                    {notificationCount}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;
