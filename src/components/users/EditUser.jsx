import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../store/userSlice";

const EditUser = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    domain: "",
    gender: "",
    avatar: "",
    available: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        domain: user.domain || "",
        gender: user.gender || "",
        avatar: user.avatar || "",
        available: user.available || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        available: formData.available,
      };

      // Dispatch the updateUser action and handle success or error
      await dispatch(
        editUser({ userId: user._id, updatedUser: updatedData })
      ).unwrap();
      setSuccess("User updated successfully!");
    } catch (err) {
      setError("Error updating user: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
