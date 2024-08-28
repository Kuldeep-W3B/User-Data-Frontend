import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, search, domain, gender, available }) => {
    const response = await axios.get('http://localhost:5000/api/', {
      params: {
        page,
        search,
        domain,
        gender,
        available,
      },
    });
    return response.data;
  }
);

// Async thunk for adding a new user
export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Ensure 'available' is a boolean
      const preparedData = {
        ...userData,
        available: userData.available === 'Available' ? true : false,
      };

      const response = await axios.post('http://localhost:5000/api/users', preparedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for editing an existing user
export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ userId, updatedUser }, { rejectWithValue }) => {
    try {
      // Ensure 'available' is a boolean
      const preparedData = {
        ...updatedUser,
        available: updatedUser.available === 'Available' ? true : false,
      };

      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, preparedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    return userId;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    totalPages: 0,
    currentPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.totalPages = 0;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add user
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); // Add the new user to the list
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Edit user
      .addCase(editUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload; // Update the user in the list
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter(user => user._id !== action.payload); // Remove the user from the list
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, clearUsers } = userSlice.actions;

export default userSlice.reducer;
