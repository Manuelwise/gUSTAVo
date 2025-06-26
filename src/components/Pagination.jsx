//pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50 cursor-pointer hover:bg-gray-100"
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-3 py-1 rounded border cursor-pointer ${
            currentPage === page
                ? 'bg-gray-100 text-black' // Current page styling
                : 'bg-yellow-400 hover:bg-gray-100' // Non-current page styling
        }`}
    >
        {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50 bg-gray-100 cursor-pointer hover:bg-yellow-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;