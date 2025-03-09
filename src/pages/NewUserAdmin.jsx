import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const NewUserAdmin = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [newAdmin, setNewAdmin] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        setIsSubmitting(true);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/admin', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewAdmin(response.data);
            console.log(data);
            setSubmitStatus('success');
            await new Promise(resolve => setTimeout(resolve, 1000));
            reset();
        } catch (error) {
            setSubmitStatus('error');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 py-10 bg-gradient-to-br from-yellow-500 via-black to-white bg-opacity-0">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Create New User Admin</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-20">
                    <div>
                        <label className="block mb-1">Username *</label>
                        <input
                            {...register('username', { required: 'This field is required' })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm">{errors.username.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Email *</label>
                        <input
                            {...register('email', { required: 'This field is required', 
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Password *</label>
                        <input
                            {...register('password', {
                                required: 'Password is required'
                            })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Role *</label>
                        <select
                            {...register('role', { required: 'This field is required' })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && (
                            <span className="text-red-500 text-sm">{errors.role.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isSubmitting ? 'Submitting...' : 'Create New User'}
                    </button>

                    {submitStatus === 'success' && (
                        <div className="text-green-600 text-center">
                            New Admin Created!
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="text-red-600 text-center">
                            An error occurred. Please try again.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default NewUserAdmin;