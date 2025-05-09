import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';

const RequestModal = ({ request, onClose }) => {
    if (!request) return null;

    const handleOverlayClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div 
            id="modal-overlay"
            className="fixed inset-0  bg-gradient-to-br from-yellow-500 via-black to-white bg-opacity-90 flex justify-center items-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4">Request Details</h2>

                <div className="space-y-3 text-sm">
                    <p><strong>Requesting Officer:</strong> {request.officerName}</p>
                    <p><strong>Department:</strong> {request.department}</p>
                    <p><strong>Supervisor Name:</strong> {request.supervisorName}</p>
                    <p><strong>Document Title:</strong> {request.documentTitle}</p>
                    <p><strong>File Reference:</strong> {request.documentReference}</p>
                    <p><strong>File Date Range</strong></p>
                    <p><strong>From:</strong> {format(new Date(request.fromDate), 'dd MMM yyyy')}</p>
                    <p><strong>To:</strong> {format(new Date(request.toDate), 'dd MMM yyyy')}</p>
                    <p><strong>Document Type:</strong> {request.documentType}</p>
                    <p><strong>Corporate Contact:</strong> +233{request.corporateNumber}</p>
                    <p><strong>Personal Contact:</strong> +233{request.personalNumber}</p>
                    <p><strong>Date of Request:</strong> {format(new Date(request.returnDate), 'dd MMM yyyy')}</p>
                    <p><strong>Document Delivery Status:</strong> {request.deliveryStatus}</p>
                    <p>
                        <strong>Status:</strong>
                        <span className={`ml-2 px-2 py-1 rounded ${
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            request.completionStatus === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                            request.completionStatus === 'returned' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {request.status}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded ${
                            request.completionStatus === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                            request.completionStatus === 'returned' ? 'bg-purple-100 text-purple-800' :
                            ''
                        }`}>
                            {request.completionStatus}
                        </span>
                    </p>
                    <p><strong>Email:</strong> {request.email}</p>
                </div>

                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestModal;
