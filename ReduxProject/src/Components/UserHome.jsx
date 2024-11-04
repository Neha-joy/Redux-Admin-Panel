// src/Components/UserHome.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const sampleData = [
    { id: 1, title: 'Profile Details', description: 'View and edit your profile information.' },
    { id: 2, title: 'Notifications', description: 'Check your recent notifications here.' },
    { id: 3, title: 'Appointments', description: 'Manage your upcoming appointments.' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Home</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mb-6">
        Logout
      </button>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleData.map((data) => (
          <div key={data.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
            <p>{data.description}</p>
          </div>
        ))}
      </div>

      {/* Duplicate Tables Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        {[1, 2].map((tableIndex) => (
          <table key={tableIndex} className="w-full bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((itemIndex) => (
                <tr key={itemIndex} className="border-b">
                  <td className="py-2 px-4">{itemIndex}</td>
                  <td className="py-2 px-4">User {itemIndex}</td>
                  <td className="py-2 px-4">Admin</td>
                  <td className="py-2 px-4">{itemIndex % 2 === 0 ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}
