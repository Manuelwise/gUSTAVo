import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RequestModalAudit = ({ requestId, onClose }) => {
    const { token } = useAuth();
    const [requestDetails, setRequestDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/requests/${requestId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }); 
                setRequestDetails(response.data);
            } catch (err) {
                console.error('Failed to fetch request details.', err);
                setError('Failed to fetch request details.');
            } finally {
                setLoading(false);
            }
        };

        if (requestId) {
            fetchRequestDetails();
        }
    }, [requestId]);

    if (loading) return <p>Loading request details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!requestDetails) return null;

    return (
        <div id="modal-overlay" className="fixed inset-0 bg-gradient-to-br from-yellow-500 via-black to-white bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">Request Details</h2>
                <div className="space-y-3 text-sm">
                    <p><strong>Requesting Officer:</strong> {requestDetails.officerName}</p>
                    <p><strong>Department:</strong> {requestDetails.department}</p>
                    <p><strong>Supervisor Name:</strong> {requestDetails.supervisorName}</p>
                    <p><strong>Document Title:</strong> {requestDetails.documentTitle}</p>
                    <p><strong>File Reference:</strong> {requestDetails.documentReference}</p>
                    <p><strong>File Date:</strong> {requestDetails.fileDate ? format(new Date(requestDetails.fileDate), 'dd MMM yyyy') : 'N/A'}</p>
                    <p><strong>Purpose of Request:</strong> {requestDetails.purpose}</p>
                    <p><strong>Telephone:</strong> +233{requestDetails.phoneNumber}</p>
                    <p><strong>Date of Request:</strong> {requestDetails.returnDate ? format(new Date(requestDetails.returnDate), 'dd MMM yyyy') : 'N/A'}</p>
                    <p>
                        <strong>Status:</strong>
                        <span className={`ml-2 px-2 py-1 rounded ${
                            requestDetails.status === 'approved' ? 'bg-green-100 text-green-800' :
                            requestDetails.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {requestDetails.status}
                        </span>
                    </p>
                    <p><strong>Email:</strong> {requestDetails.email}</p>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestModalAudit;