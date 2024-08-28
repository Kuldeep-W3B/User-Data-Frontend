import React, { useState } from 'react';
import EditUser from '../components/users/EditUser';
import DeleteUser from '../components/users/DeleteUser';

const UserCard = ({ user, toggleSelectUser, isSelected, isSelectionMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className={`relative bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col items-start w-full sm:w-1/1 md:w-1/3 lg:w-1/4 ${isSelectionMode ? 'cursor-pointer' : ''}`}>
      {isSelectionMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelectUser(user._id)}
          className="absolute top-2 right-2"
        />
      )}
      <div className="flex items-center w-full mb-4">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <h3 className="text-lg font-bold">{`${user.first_name} ${user.last_name}`}</h3>
      </div>
      <ul className="text-gray-500 text-left mb-4 w-full">
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Domain:</strong> {user.domain}</li>
        <li><strong>Gender:</strong> {user.gender}</li>
        <li className={`mt-1 ${user.available ? 'text-green-500' : 'text-red-500'}`}>
          {user.available ? 'Available' : 'Not Available'}
        </li>
      </ul>
      <div className={`flex space-x-2 mt-4 w-full ${isSelectionMode ? 'hidden' : ''}`}>
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* Conditionally render EditUser component */}
      {isEditing && (
        <EditUser user={user} onClose={handleCloseEdit} />
      )}

      {/* Conditionally render DeleteUser component */}
      {isDeleting && (
        <DeleteUser user={user} onClose={handleCloseDelete} />
      )}
    </div>
  );
};

export default UserCard;
