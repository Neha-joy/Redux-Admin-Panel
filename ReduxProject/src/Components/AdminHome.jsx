// src/Components/AdminHome.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, logout } from '../redux/adminUserSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.adminUser.users);
  const loggedInUser = useSelector((state) => state.adminUser.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserType');
    navigate('/', { replace: true });
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Home</h1>
        {loggedInUser && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
{/* 
      <h2 className="text-xl font-semibold mb-2">
        Logged in as: {loggedInUser ? loggedInUser.username : 'Guest'}
      </h2> */}

      <h2 className="text-xl font-semibold mb-2">User Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Password</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.password}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-2 px-4 text-center border">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
