// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Users, CheckCircle, XCircle, Truck, ArrowLeftCircle } from 'lucide-react';
import DashboardStats from '../components/DashboardStats';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Pagination from '../components/Pagination';
import RequestModal from '../components/RequestModal';
import DateRangeFilter from '../components/DateRangeFilter';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import featureImage from '../assets/image/dashboard2.webp';
import StatusChangeModal from '../components/StatusChangeModal';

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showStatusModal, setShowStatusModal] = useState(false);
<<<<<<< HEAD
    const [pendingStatusChange, setPendingStatusChange] = useState(null);
=======
    const [pendingStatusChange, setPendingStatusChange] = useState(null); // { id, newStatus }
    

>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6

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
            setAlert({ type: 'error', message: 'Failed to fetch requests' });
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusModalSubmit = async ({ id, status, additionalInfo, reasonForRejection }) => {
        setIsLoading(true);
        try {
<<<<<<< HEAD
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:5000/api/requests/${id}`,
                { status, additionalInfo, reasonForRejection },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setAlert({ type: 'success', message: `Status updated to ${status}` });
=======
          const token = localStorage.getItem('token');
          await axios.patch(
            `http://localhost:5000/api/requests/${id}`,
            { status, additionalInfo, reasonForRejection },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
      
          setAlert({ type: 'success', message: `Status updated to ${status}` });
          fetchRequests();
        } catch (error) {
          setAlert({ type: 'error', message: 'Failed to update status' });
        } finally {
          setIsLoading(false);
        }
      };
      

    const statusReturned = async (id, newStatus) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:5000/api/requests/returned/${id}`, { completionStatus: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAlert({ type: 'success', message: `Status updated to ${newStatus}` });
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
            fetchRequests();
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to update status' });
        } finally {
            setIsLoading(false);
        }
    };

<<<<<<< HEAD
=======
    const statusDispatched = async (id, newStatus) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:5000/api/requests/dispatched/${id}`, { completionStatus: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAlert({ type: 'success', message: `Status updated to ${newStatus}` });
            fetchRequests();    
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to update status' });
        } finally {
            setIsLoading(false);
        }
    };

>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
    const ITEMS_PER_PAGE = 3;

    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            (request.officerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.documentTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.email?.toLowerCase().includes(searchTerm.toLowerCase()));

        const requestDate = new Date(request.returnDate);
        const isWithinDateRange =
            (!startDate || requestDate >= new Date(startDate)) &&
            (!endDate || requestDate <= new Date(endDate));

        return matchesSearch && isWithinDateRange;
    });

    const paginatedRequests = filteredRequests.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

<<<<<<< HEAD
    // Function to get appropriate dropdown options based on request status
    const getDropdownOptions = (request) => {
        // Admin should only see Approve/Reject for pending requests
        // For already approved/rejected requests, show current status only
        if (request.status === 'pending') {
            return (
                <select
                    value="pending"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue === 'approved' || selectedValue === 'rejected') {
                            setPendingStatusChange({ id: request._id, newStatus: selectedValue });
                            setShowStatusModal(true);
                        }
                    }}
                    className="p-2 border rounded"
                >
                    <option value="pending">Select Action</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                </select>
            );
        } else {
            // For non-pending requests, show read-only status
            return (
                <span className={`px-3 py-2 rounded text-sm font-medium ${
                    request.completionStatus === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                    request.completionStatus === 'returned' ? 'bg-purple-100 text-purple-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                    {request.completionStatus || request.status}
                </span>
            );
        }
    };

    return (
        <div
            className="bg-cover bg-center"
            style={{
                backgroundImage: `url(${featureImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.9,
            }}
        >
            <div className="container mx-auto px-4 py-8">
                {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-6">DoRS Dashboard</h2>
                    <DashboardStats
                        stats={[
                            { title: 'Total Requests', value: requests.length, icon: FileText, link: '/admin/reports' },
                            { title: 'Pending Requests', value: requests.filter(r => r.status === 'pending').length, icon: Users },
                            { title: 'Approved', value: requests.filter(r => r.status === 'approved').length, icon: CheckCircle },
                            { title: 'Rejected', value: requests.filter(r => r.status === 'rejected').length, icon: XCircle },
                            { title: 'Dispatched', value: requests.filter(r => r.completionStatus === 'dispatched').length, icon: Truck },
                            { title: 'Returned', value: requests.filter(r => r.completionStatus === 'returned').length, icon: ArrowLeftCircle }
                        ]}
                    />
                </div>

                <div className="mb-4">
                    <Link to="/admin/users" className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-blue-700">
                        View Audit Logs
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">File Access Requests</h2>
                            <SearchBar onSearch={setSearchTerm} />
                        </div>
                        <DateRangeFilter
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                        />
                    </div>

                    {isLoading ? <LoadingSpinner /> : (
                        <div className="flex flex-col space-y-4">
                            {paginatedRequests.map((request, index) => (
                                <div
                                    key={request._id}
                                    className="border p-4 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 flex justify-between items-center cursor-pointer"
                                    onClick={() => setSelectedRequest(request)}
                                >
                                    <div className="flex-1">
                                        <span className="font-bold">
                                            {index + 1}. {format(new Date(request.returnDate), 'dd MMMM, yyyy')}
                                        </span>
                                        <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                            (request.completionStatus === 'dispatched') ? 'bg-blue-100 text-blue-800' :
                                            (request.completionStatus === 'returned') ? 'bg-purple-100 text-purple-800' :
                                            (request.status === 'approved') ? 'bg-green-100 text-green-800' :
                                            (request.status === 'rejected') ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {request.completionStatus || request.status}
                                        </span>

                                        <div className="mt-2">
                                            <p>Officer: {request.officerName}</p>
                                            <p>Supervisor: {request.supervisorName}</p>
                                            <p>Email: {request.email}</p>
                                        </div>
                                    </div>

                                    {getDropdownOptions(request)}
                                </div>
                            ))}
                        </div>
                    )}

                    <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)} onPageChange={setCurrentPage} />
                </div>

                {selectedRequest && (
                    <RequestModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
                )}
                
                {showStatusModal && pendingStatusChange && (
                    <StatusChangeModal
                        id={pendingStatusChange.id}
                        status={pendingStatusChange.newStatus}
                        onSubmit={handleStatusModalSubmit}
                        onClose={() => setShowStatusModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
=======
    return (
        <div
        className="bg-cover bg-center"
        style={{
            backgroundImage: `url(${featureImage})`,
            backgroundSize: 'cover', // Ensures the whole image fits inside the div
            backgroundPosition: 'center', // Centers the image within the div
            backgroundRepeat: 'no-repeat', // Prevents tiling if the image is smaller than the div
            opacity: 0.9,
            // height: '    calc(100vh - 100px)', // Adjust this value based on your navbar and footer height
        }}
    >
        <div className="container mx-auto px-4 py-8">
            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            <div className="mb-8">
                <h2 className="text-4xl font-bold mb-6">DoRS Dashboard</h2>
                <DashboardStats
                 stats={[
                    { title: 'Total Requests', value: requests.length, icon: FileText, link: '/admin/reports' },
                    { title: 'Pending Requests', value: requests.filter(r => r.status === 'pending').length, icon: Users },
                    { title: 'Approved', value: requests.filter(r => r.status === 'approved').length, icon: CheckCircle },
                    { title: 'Rejected', value: requests.filter(r => r.status === 'rejected').length, icon: XCircle },
                    { title: 'Dispatched', value: requests.filter(r => r.completionStatus === 'dispatched').length, icon: Truck },
                    { title: 'Returned', value: requests.filter(r => r.completionStatus === 'returned').length, icon: ArrowLeftCircle }
                  ]}
                />
            </div>

            <div className="mb-4">
                <Link to="/admin/users" className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Audit Logs
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">File Access Requests</h2>
                        <SearchBar onSearch={setSearchTerm} />
                    </div>
                    <DateRangeFilter
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                    />
                </div>

                {isLoading ? <LoadingSpinner /> : (
                    <div className="flex flex-col space-y-4">
                        {paginatedRequests.map((request, index) => (
                            <div
                                key={request._id}
                                className="border p-4 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 flex justify-between items-center cursor-pointer"
                                onClick={() => setSelectedRequest(request)}
                            >
                                <div className="flex-1">
                                    <span className="font-bold">
                                        {index + 1}. {format(new Date(request.returnDate), 'dd MMMM, yyyy')}
                                    </span>
                                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                        (request.completionStatus === 'dispatched') ? 'bg-blue-100 text-blue-800' :
                                        (request.completionStatus === 'returned') ? 'bg-purple-100 text-purple-800' :
                                        (request.status === 'approved') ? 'bg-green-100 text-green-800' :
                                        (request.status === 'rejected') ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {request.completionStatus || request.status}
                                    </span>

                                    <div className="mt-2">
                                        <p>Officer: {request.officerName}</p>
                                        <p>Supervisor: {request.supervisorName}</p>
                                        <p>Email: {request.email}</p>
                                    </div>
                                </div>

                                <select
                                    value={request.completionStatus || request.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                    
                                        if (selectedValue === 'approved' || selectedValue === 'rejected') {
                                            setPendingStatusChange({ id: request._id, newStatus: selectedValue });
                                            setShowStatusModal(true);
                                        } else if (selectedValue === 'returned') {
                                            statusReturned(request._id, selectedValue);
                                        } else if (selectedValue === 'dispatched') {
                                            statusDispatched(request._id, selectedValue);
                                        } else {
                                            handleStatusChange(request._id, selectedValue);
                                        }
                                    }}                                    
                                    className="p-2 border rounded"
                                >
                                    <option value="requested">Request</option>
                                    <option value="approved">Approve</option>
                                    <option value="rejected">Reject</option>
                                    <option value="dispatched">Dispatch</option>
                                    <option value="returned">Return</option>
                                </select>
                            </div>
                        ))}
                    </div>
                )}

                <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)} onPageChange={setCurrentPage} />
            </div>

            {selectedRequest && (
                <RequestModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
            )}
            {showStatusModal && pendingStatusChange && (
            <StatusChangeModal
                id={pendingStatusChange.id}
                status={pendingStatusChange.newStatus}
                onSubmit={handleStatusModalSubmit}
                onClose={() => setShowStatusModal(false)}
            />
            )}  
        </div>
    </div>
    );
};

export default AdminDashboard;
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
