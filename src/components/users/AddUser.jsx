import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/userSlice';

const AddNewUser = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    domain: '',
    gender: '',
    available: '',
    avatar: '', 
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData)).unwrap();
      alert('User added successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        domain: '',
        gender: '',
        available: '',
        avatar: '', 
      });
      onClose();
    } catch (error) {
      alert(`Failed to add user: ${error}`);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      domain: '',
      gender: '',
      available: '',
      avatar: '', 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="relative p-4 bg-white shadow-md rounded-md w-1/2 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="p-2 border rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-2 border rounded w-full mb-2"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          required
        />
         <select
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          required
        >
          <option value="">All Domains</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Business Development">Business Development</option>
        </select>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Agender">Agender</option>
          <option value="Bigender">Bigender</option>
        </select>
        <select
          name="available"
          value={formData.available}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          required
        >
          <option value="avaikable">Select Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddNewUser;
