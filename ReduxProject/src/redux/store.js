// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminUserSlice from './adminUserSlice';

const store = configureStore({
  reducer: {
    adminUser: adminUserSlice,
  },
});

export default store;
