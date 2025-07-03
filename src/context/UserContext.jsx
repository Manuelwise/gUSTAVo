<<<<<<< HEAD
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
=======
import React, { createContext, useContext, useState } from 'react';
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
<<<<<<< HEAD
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [userProcessingRequests, setUserProcessingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch approved requests available for processing
    const fetchApprovedRequests = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            setIsLoading(true);
            console.log('Fetching approved requests...');
            
            // Skip the problematic /approved endpoint and go straight to main endpoint
            const response = await axios.get('http://localhost:5000/api/requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            console.log('Raw requests data:', response.data);
            
            // Filter to only show requests that are approved but not yet completed
            const approvedOnly = response.data.filter(request => 
                request.status === 'approved' && 
                (!request.processingStatus || request.processingStatus !== 'completed')
            );
            
            console.log('Filtered approved requests:', approvedOnly);
            setApprovedRequests(approvedOnly);
            
        } catch (error) {
            console.error('Error fetching requests:', error);
            // Set empty array on error to prevent undefined errors
            setApprovedRequests([]);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch requests that the current user is processing
    const fetchUserProcessingRequests = useCallback(async () => {
        const token = localStorage.getItem('token');
        const currentUsername = localStorage.getItem('username');
        if (!token || !currentUsername) return;

        try {
            console.log('Fetching user processing requests for:', currentUsername);
            
            const response = await axios.get('http://localhost:5000/api/requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Filter to only show requests claimed by current user
            const userRequests = response.data.filter(request => 
                request.claimedBy === currentUsername
            );
            
            console.log('User processing requests:', userRequests);
            setUserProcessingRequests(userRequests);
        } catch (error) {
            console.error('Error fetching user processing requests:', error);
            setUserProcessingRequests([]);
            throw error;
        }
    }, []);

    // Claim a request for processing
    const claimRequest = useCallback(async (requestId) => {
        const token = localStorage.getItem('token');
        const currentUsername = localStorage.getItem('username');
        if (!token || !currentUsername) return;

        try {
            console.log('Claiming request:', requestId, 'for user:', currentUsername);
            
            await axios.patch(
                `http://localhost:5000/api/requests/${requestId}/claim`,
                { claimedBy: currentUsername },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update local state optimistically
            setApprovedRequests(prev => 
                prev.map(request => 
                    request._id === requestId 
                        ? { ...request, claimedBy: currentUsername }
                        : request
                )
            );
        } catch (error) {
            console.error('Error claiming request:', error);
            // If the endpoint doesn't exist, try updating the request directly
            try {
                await axios.patch(
                    `http://localhost:5000/api/requests/${requestId}`,
                    { claimedBy: currentUsername },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                setApprovedRequests(prev => 
                    prev.map(request => 
                        request._id === requestId 
                            ? { ...request, claimedBy: currentUsername }
                            : request
                    )
                );
            } catch (fallbackError) {
                console.error('Fallback claim request also failed:', fallbackError);
                throw fallbackError;
            }
        }
    }, []);

    // Update processing status of a request
    const updateProcessingStatus = useCallback(async (requestId, status, notes) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            console.log('Updating processing status:', requestId, 'to:', status);
            
            await axios.patch(
                `http://localhost:5000/api/requests/${requestId}/processing`,
                { 
                    processingStatus: status,
                    processingNotes: notes,
                    processedAt: new Date().toISOString()
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update local state
            const updateRequest = (request) => 
                request._id === requestId 
                    ? { 
                        ...request, 
                        processingStatus: status,
                        processingNotes: notes,
                        processedAt: new Date().toISOString()
                    }
                    : request;
            
            setApprovedRequests(prev => prev.map(updateRequest));
            setUserProcessingRequests(prev => prev.map(updateRequest));
            
        } catch (error) {
            console.error('Error updating processing status:', error);
            // Fallback to general request update
            try {
                await axios.patch(
                    `http://localhost:5000/api/requests/${requestId}`,
                    { 
                        processingStatus: status,
                        processingNotes: notes,
                        processedAt: new Date().toISOString()
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                const updateRequest = (request) => 
                    request._id === requestId 
                        ? { 
                            ...request, 
                            processingStatus: status,
                            processingNotes: notes,
                            processedAt: new Date().toISOString()
                        }
                        : request;
                
                setApprovedRequests(prev => prev.map(updateRequest));
                setUserProcessingRequests(prev => prev.map(updateRequest));
                
            } catch (fallbackError) {
                console.error('Fallback processing status update also failed:', fallbackError);
                throw fallbackError;
            }
        }
    }, []);

    // Refresh all data
    const refreshData = useCallback(async () => {
        await Promise.all([
            fetchApprovedRequests(),
            fetchUserProcessingRequests()
        ]);
    }, [fetchApprovedRequests, fetchUserProcessingRequests]);

    return (
        <UserContext.Provider value={{ 
            // Original state
            userId, 
            setUserId, 
            username, 
            setUsername,
            
            // New state for request processing
            approvedRequests,
            userProcessingRequests,
            isLoading,
            
            // Actions
            fetchApprovedRequests,
            fetchUserProcessingRequests,
            claimRequest,
            updateProcessingStatus,
            refreshData
        }}>
=======

    return (
        <UserContext.Provider value={{ userId, setUserId, username, setUsername }}>
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);