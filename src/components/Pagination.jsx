import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setPage } from '../store/userSlice'; // Adjust the path as needed

const PaginationComponent = () => {
  const dispatch = useDispatch();

  // Access currentPage and totalPages from the Redux store
  const currentPage = useSelector((state) => state.users.currentPage);
  const totalPages = useSelector((state) => state.users.totalPages);

  // Function to handle page change
  const handlePageChangeInternal = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      // Dispatch the fetchUsers action with the selected page
      dispatch(setPage(page));
      dispatch(fetchUsers({ page })); // Adjust other filters if needed
    }
  };

  // Calculate the range of page numbers to display
  const paginationRange = 10; // Number of pagination buttons to show
  const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
  const endPage = Math.min(totalPages, startPage + paginationRange - 1);
  const adjustedStartPage = Math.max(1, endPage - paginationRange + 1);

  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={() => handlePageChangeInternal(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChangeInternal(page)}
          className={`mx-1 px-3 py-1 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChangeInternal(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
