// src/pages/Reports.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
import axios from 'axios';

const Reports = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/reports', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      setRequests(data.requests);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to fetch reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for statistics
  const calculateAdminPerformance = () => {
    const adminStats = {};
    requests.forEach(req => {
      const admin = req.adminName || 'Unknown Admin';
      if (!adminStats[admin]) {
        adminStats[admin] = {
          processed: 0,
          approved: 0,
          rejected: 0,
          avgProcessingTime: 0,
          total: 0
        };
      }
      adminStats[admin].total++;
      adminStats[admin].processed++;

      if (req.status === 'approved') {
        adminStats[admin].approved++;
      } else if (req.status === 'rejected') {
        adminStats[admin].rejected++;
      }

      const processingTime = Math.floor((new Date(req.returnDate) - new Date(req.requestDate)) / (1000 * 60 * 60 * 24));
      adminStats[admin].avgProcessingTime += processingTime;
    });

    return Object.entries(adminStats).map(([admin, stats]) => ({
      adminName: admin,
      processed: stats.processed,
      approved: stats.approved,
      rejected: stats.rejected,
      avgTime: Math.round(stats.avgProcessingTime / stats.processed),
      total: stats.total
    }));
  };

  const calculateMonthlyStats = () => {
    const monthlyStats = {};
    requests.forEach(req => {
      const month = format(new Date(req.returnDate), 'MMM yyyy');
      if (!monthlyStats[month]) {
        monthlyStats[month] = {
          total: 0,
          avgTime: 0,
          approved: 0,
          totalDays: 0
        };
      }
      monthlyStats[month].total++;
      monthlyStats[month].approved += req.status === 'approved' ? 1 : 0;
      const processingTime = Math.floor((new Date(req.returnDate) - new Date(req.requestDate)) / (1000 * 60 * 60 * 24));
      monthlyStats[month].totalDays += processingTime;
    });

    return Object.entries(monthlyStats).map(([month, stats]) => ({
      month: month,
      total: stats.total,
      avgTime: Math.round(stats.totalDays / stats.total),
      approvalRate: Math.round((stats.approved / stats.total) * 100)
    }));
  };

  const calculateRequestTrends = () => {
    const trends = {};
    requests.forEach(req => {
      const month = format(new Date(req.returnDate), 'MMM yyyy');
      trends[month] = (trends[month] || 0) + 1;
    });
    return Object.entries(trends).map(([month, count]) => ({ month, count }));
  };

  const calculateDepartmentStats = () => {
    const stats = {};
    requests.forEach(req => {
      const dept = req.department;
      stats[dept] = (stats[dept] || 0) + 1;
    });
    return Object.entries(stats).map(([dept, count]) => ({ dept, count }));
  };

  const calculateOfficerStats = () => {
    const officerStats = {};
    requests.forEach(req => {
      const officer = req.officerName;
      if (!officerStats[officer]) {
        officerStats[officer] = {
          total: 0,
          pending: 0,
          completed: 0,
          rejected: 0
        };
      }
      officerStats[officer].total++;
      if (req.status === 'pending') {
        officerStats[officer].pending++;
      } else if (req.status === 'approved' || req.status === 'dispatched' || req.status === 'returned') {
        officerStats[officer].completed++;
      } else if (req.status === 'rejected') {
        officerStats[officer].rejected++;
      }
    });

    return Object.entries(officerStats).map(([officer, stats]) => ({
      officerName: officer,
      total: stats.total,
      pending: stats.pending,
      completed: stats.completed,
      rejected: stats.rejected
    }));
  };

  const handleExport = () => {
    const data = requests.map(req => ({
      'Officer Name': req.officerName,
      'Department': req.department,
      'Document Title': req.documentTitle,
      'Status': req.status,
      'Request Date': format(new Date(req.requestDate), 'dd MMM yyyy'),
      'Return Date': format(new Date(req.returnDate), 'dd MMM yyyy'),
      'Processing Time': Math.floor((new Date(req.returnDate) - new Date(req.requestDate)) / (1000 * 60 * 60 * 24)) + ' days'
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + data.map(e => Object.values(e).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requests_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchReports}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">System Reports</h1>
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export to CSV
        </button>
      </div>

      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="date"
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="date"
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="p-2 border rounded"
          />
                   <button
                     onClick={() => setDateRange(null)}
                     className="bg-gray-200 p-2 rounded"
                   >
                     Clear
                   </button>
                 </div>
               </div>
         
               {/* Request Trends */}
               <div className="mb-8">
                 <h2 className="text-2xl font-bold mb-4">Request Trends</h2>
                 <BarChart width={800} height={300} data={calculateRequestTrends()}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="month" />
                   <YAxis />
                   <Tooltip />
                   <Bar dataKey="count" fill="#8884d8" />
                 </BarChart>
               </div>
         
               {/* Department Distribution */}
               <div className="mb-8">
                 <h2 className="text-2xl font-bold mb-4">Department Distribution</h2>
                 <BarChart width={800} height={300} data={calculateDepartmentStats()}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="dept" />
                   <YAxis />
                   <Tooltip />
                   <Bar dataKey="count" fill="#82ca9d" />
                 </BarChart>
               </div>
         
               {/* Admin Performance */}
               <div className="mb-8">
                 <h2 className="text-2xl font-bold mb-4">Admin Performance</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {calculateAdminPerformance().map((stat, index) => (
                     <div key={index} className="bg-white p-6 rounded-lg shadow">
                       <h3 className="text-lg font-semibold mb-2">{stat.adminName}</h3>
                       <p>Total Requests: {stat.total}</p>
                       <p>Processed: {stat.processed}</p>
                       <p>Approved: {stat.approved}</p>
                       <p>Rejected: {stat.rejected}</p>
                       <p>Average Processing Time: {stat.avgTime} days</p>
                     </div>
                   ))}
                 </div>
               </div>
         
               {/* Officer Statistics */}
               <div className="mb-8">
                 <h2 className="text-2xl font-bold mb-4">Officer Statistics</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {calculateOfficerStats().map((stat, index) => (
                     <div key={index} className="bg-white p-6 rounded-lg shadow">
                       <h3 className="text-lg font-semibold mb-2">{stat.officerName}</h3>
                       <p>Total Requests: {stat.total}</p>
                       <p>Pending: {stat.pending}</p>
                       <p>Completed: {stat.completed}</p>
                       <p>Rejected: {stat.rejected}</p>
                     </div>
                   ))}
                 </div>
               </div>
         
               {/* Monthly Statistics */}
               <div className="mb-8">
                 <h2 className="text-2xl font-bold mb-4">Monthly Statistics</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {calculateMonthlyStats().map((stat, index) => (
                     <div key={index} className="bg-white p-6 rounded-lg shadow">
                       <h3 className="text-lg font-semibold mb-2">{stat.month}</h3>
                       <p>Total Requests: {stat.total}</p>
                       <p>Average Processing Time: {stat.avgTime} days</p>
                       <p>Approval Rate: {stat.approvalRate}%</p>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           );
         };
         
         export default Reports;