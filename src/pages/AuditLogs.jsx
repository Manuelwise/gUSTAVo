import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import RequestModal from '../components/RequestModal';

const AuditLogs = () => {
    const { token } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;

    // Search and Date Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/activity', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLogs(response.data.data);
            } catch (err) {
                setError('Failed to fetch activity logs.');
            } finally {
                setLoading(false);
            }
        };

        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:5000/api/requests', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const sortedRequests = response.data.sort((a, b) => new Date(b.returnDate) - new Date(a.returnDate));
                setRequests(sortedRequests);
            } catch (error) {
                setError('Failed to fetch requests'); // Use setError instead of setAlert
            }
        };

        fetchLogs();
        fetchRequests();
    }, [token]);

    // Filter logs by search term + date range
    const filteredLogs = logs.filter(log => {
        const logDate = new Date(log.createdAt).toISOString().split('T')[0];
        const matchesSearchTerm =
            log.details.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(log.createdAt).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase());

        const withinDateRange = (!startDate || logDate >= startDate) && (!endDate || logDate <= endDate);

        return matchesSearchTerm && withinDateRange;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const currentLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Clear Date Filters
    const clearDateFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    if (loading) return <p className="text-center">Loading activity logs...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Activity Logs</h2>
                <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Dashboard
                </Link>
            </div>

            {/* Search & Date Filter */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-4 py-2 rounded shadow-sm"
                />
                <div className="flex items-center gap-2">
                    <label className="text-sm">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border px-4 py-2 rounded shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border px-4 py-2 rounded shadow-sm"
                    />
                </div>
                <button
                    onClick={clearDateFilters}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear Filters
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Timestamp</th>
                            <th className="px-4 py-2 text-left">Username</th>
                            <th className="px-4 py-2 text-left">Action</th>
                            <th className="px-4 py-2 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.map((log, index) => {
                            const request = requests.find(req => req._id === log.requestId); // Find the corresponding request
                            return (
                                <tr key={index} className="border-b cursor-pointer" onClick={() => setSelectedRequest(request)}>
                                    <td className="px-4 py-2">{new Date(log.createdAt).toLocaleString()}</td>
                                    <td className="px-4 py-2">{log.details.username}</td>
                                    <td className="px-4 py-2">{log.action}</td>
                                    <td className="px-4 py-2">{log.requestId}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {selectedRequest && (
                <RequestModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AuditLogs;