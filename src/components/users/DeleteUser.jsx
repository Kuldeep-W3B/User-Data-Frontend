import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store/userSlice';

const DeleteUser = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(user._id)).unwrap();
      onClose(); 
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="relative p-4 bg-white shadow-md rounded-md w-1/2 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Delete User</h2>
      <p className="mb-4">Are you sure you want to delete {user.first_name} {user.last_name}?</p>
      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
      </div>
    </div>
  );
};

export default DeleteUser;
