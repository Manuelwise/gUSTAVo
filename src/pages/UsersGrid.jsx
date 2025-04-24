import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import featureImage from '../assets/image/typeshii2_Enhanced.jpg';

const UsersGrid = () => {
    const { token } = useAuth();
    const { setUserId, setUsername } = useUser(); // Get setUserId from context
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/all-users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Fetched users:', response.data);
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    if (loading) return <p className="text-center">Loading Admins...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const filteredUsers = users.data.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="bg-cover bg-center"
            style={{
                backgroundImage: `url(${featureImage})`,
                backgroundSize: 'fill', // Ensures the whole image fits inside the div
                backgroundPosition: 'center', // Centers the image within the div
                backgroundRepeat: 'no-repeat', // Prevents tiling if the image is smaller than the div
                opacity: 0.9,
                height: '100vh', // Adjust this value based on your navbar and footer height
            }}
        >
            <div className="container mx-6 h-auto px-1 py-8 relative">
                <h2 className="text-5xl font-bold mb-4 text-center align-middle">Welcome To DoRS Admin Page</h2>
                <h2 className="text-2xl font-bold mb-4">Admins</h2>
                <div className="mb-4">
                    <span className="text-gray-100 mb-4">Search for an admin by username</span>
                    <span className="text-gray-100 mb-4">Track the activities of the admins</span>
                </div>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 mb-4 w-150 bg-gray-100"
                />
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredUsers.map(user => (
                        <Link
                            key={user._id}
                            to={`/admin/audit-logs`}
                            onClick={() => { setUserId(user._id); setUsername(user.username); }} // Set userId on click
                            className="border p-4 rounded bg-gray-100 hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105 text-center w-full"
                        >
                            {user.username}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersGrid;