import React from 'react';

const StatCard = ({ title, value, icon: Icon, status, onClick }) => (
  <div 
    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
    onClick={() => onClick(status)} // Pass the status directly instead of title
  >
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const DashboardStats = ({ stats, onStatClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} onClick={onStatClick} />
      ))}
    </div>
  );
};

export default DashboardStats;
