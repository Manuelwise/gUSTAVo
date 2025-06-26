// components/DashboardStats.jsx
import { Link } from 'react-router-dom';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const StatContent = (
          <div className="bg-white p-6 rounded-lg shadow hover:bg-yellow-100 transition transform hover:scale-105 cursor-pointer">
            <stat.icon className="h-8 w-8 mb-2 text-gray-600" />
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        );

        return stat.link ? (
          <Link to={stat.link} key={index}>
            {StatContent}
          </Link>
        ) : (
          <div key={index}>{StatContent}</div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
