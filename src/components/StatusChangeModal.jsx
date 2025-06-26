import React, { useState } from 'react';
import { X } from 'lucide-react';

const StatusChangeModal = ({ id, status, onSubmit, onClose }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    const handleFormSubmit = async (e) =>  {
        e.preventDefault();
        setIsLoading(true);

    const payload =
      status === 'approved'
        ? { id, status, additionalInfo: input }
        : { id, status, reasonForRejection: input };

    try {
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  
    };

    return (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gradient-to-br from-yellow-500 via-black to-white bg-opacity-90 flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={onClose}
            >
              <X />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {status === 'approved'
                ? 'Do you want to add any extra information to this request approval?'
                : 'Do you want to add reasons for rejecting this request?'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <textarea
                className="w-full border p-2 rounded"
                rows={4}
                placeholder={
                  status === 'approved'
                    ? 'Enter approval notes...'
                    : 'Enter reason for rejection...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

export default StatusChangeModal;
