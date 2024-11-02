// src/Components/UserHome.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/adminUserSlice';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.adminUser.user);

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserType');
    navigate('/', { replace: true });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Home</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
      {/* Additional user home content */}
    </div>
  );
}
