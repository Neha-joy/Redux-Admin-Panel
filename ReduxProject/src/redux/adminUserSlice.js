// src/redux/adminUserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [], // List of all users
};

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    // Action to set login status and user data
    setLoginStatus: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    // Action to logout and clear user data
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    // Action to fetch users from localStorage
    fetchUsers: (state) => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      state.users = storedUsers;
    },

    // Action to add a new user and save to localStorage
    addUser: (state, action) => {
      const newUser = action.payload;
      state.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.users));
    },

    // Action to remove a user and update localStorage
    removeUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(state.users));
    },

    // Action to update a user's details and save to localStorage
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
  },
});

// Export actions for use in components
export const { setLoginStatus, logout, fetchUsers, addUser, removeUser, updateUser } = adminUserSlice.actions;

export default adminUserSlice.reducer;
