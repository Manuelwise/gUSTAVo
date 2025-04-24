import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import Pagination from '../components/Pagination';
import RequestModalAudit from '../components/RequestModalAudit';
import { Link } from 'react-router-dom';
import featureImage from '../assets/image/typeshii4Prime.jpg';

const AuditLogs = () => {
    const { token } = useAuth();
    const { userId, username } = useUser(); // Get userId and username from context
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;

    useEffect(() => {
        const fetchLogsForUser = async () => {
            console.log('Fetching logs for user:', userId);
            if (!userId) return; // Ensure userId is available
            try {
                const response = await axios.get(`http://localhost:5000/api/activity/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLogs(response.data.data); // Access the logs here
                console.log('Fetched logs:', response.data);
            } catch (err) {
                console.error('Failed to fetch activity logs.', err);
                setError('Failed to fetch activity logs.'); // Set error state
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchLogsForUser();
    }, [userId, token]);

    // Pagination logic
    const totalPages = Math.ceil(logs.length / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const currentLogs = logs.slice(startIndex, startIndex + logsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <p className="text-center">Loading activity logs for the User...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

   return (
    <div
    className="bg-cover bg-center rounded-md"
    style={{
        backgroundImage: `url(${featureImage})`,
        backgroundSize: 'cover', // Ensures the whole image fits inside the div
        backgroundPosition: 'center', // Centers the image within the div
        backgroundRepeat: 'no-repeat', // Prevents tiling if the image is smaller than the div
        opacity: 0.9,
        // height: 'calc(100vh - 100px)', // Adjust this value based on your navbar and footer height
    }}
>
      <div className="container mx-auto px-4 py-8">  
           <h2 className="text-5xl text-white font-bold mb-4 text-center">Activity Logs for Admin: {username}</h2>
           <div className="flex justify-between mb-4">
               <span></span> {/* Placeholder for alignment */}
               <Link
                   to="/admin/users"
                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               >
                   Back to Users Logs
               </Link>
           </div>
           <div className="overflow-x-auto bg-white shadow rounded-lg">
               <table className="min-w-full table-auto">
                   <thead className="bg-gray-100">
                       <tr>
                           <th className="px-4 py-2 text-left">Timestamp</th>
                           <th className="px-4 py-2 text-left">Document Title</th>
                           <th className="px-4 py-2 text-left">Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {currentLogs.map((log, index) => (
                           <tr key={index} className="border-b cursor-pointer" onClick={() => setSelectedRequest(log.requestId)}>
                               <td className="px-4 py-2">{new Date(log.createdAt).toLocaleString()}</td>
                               <td className="px-4 py-2">{log.documentTitle}</td>
                               <td className="px-4 py-2">{log.action}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
           {selectedRequest && (
               <RequestModalAudit requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />
           )}
   
           {/* Pagination */}
           <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={handlePageChange}
           />
           </div>
       </div>
   );
};

export default AuditLogs;