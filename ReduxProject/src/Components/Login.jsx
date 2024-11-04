import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../redux/adminUserSlice';

export default function Login() {
  const [userType, setUserType] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if a user is already logged in and redirect accordingly
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userType = localStorage.getItem('loggedInUserType');
    if (loggedInUser) {
      if (userType === 'admin') {
        navigate('/admin-home', { replace: true });
      } else {
        navigate('/user-home', { replace: true });
      }
    }
  }, [navigate]);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem(`user_${username}`));

    if (storedUser && storedUser.password === password) {
      if (userType === 'admin' && storedUser.isAdmin && storedUser.adminCode === uniqueCode) {
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        localStorage.setItem('loggedInUserType', 'admin');
        dispatch(setLoginStatus(storedUser));
        navigate('/admin-home', { replace: true });
        window.history.pushState(null, '', window.location.href); // Prevent going back
      } else if (userType === 'user' && !storedUser.isAdmin) {
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        localStorage.setItem('loggedInUserType', 'user');
        dispatch(setLoginStatus(storedUser));
        navigate('/user-home', { replace: true });
        window.history.pushState(null, '', window.location.href); // Prevent going back
      } else {
        setError('Invalid credentials or unique code for admin.');
      }
    } else {
      setError('Username or password is incorrect.');
    }

    setUsername('');
    setPassword('');
    setUniqueCode('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-800">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Login</h2>

        <fieldset className="mb-4">
          <legend className="text-lg font-medium text-gray-600 mb-2">Login page</legend>
          <div className='flex gap-4'>
            <label className="inline-flex items-center ">
              <input 
                type="radio" 
                value="user" 
                checked={userType === 'user'} 
                onChange={handleUserTypeChange} 
                className="form-radio h-4 w-4 text-blue-600" 
              />
              <span className="ml-2 text-gray-700">User</span>
            </label>
            
            <label className="inline-flex items-center ">
              <input 
                type="radio" 
                value="admin" 
                checked={userType === 'admin'} 
                onChange={handleUserTypeChange} 
                className="form-radio h-4 w-4 text-blue-600" 
              />
              <span className="ml-2 text-gray-700">Admin</span>
            </label>
          </div>
        </fieldset>

        <label className="block mb-4">
          <span className="text-gray-700">Username:</span>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </label>

        {userType === 'admin' && (
          <label className="block mb-4">
            <span className="text-gray-700">Unique Code:</span>
            <input 
              type="text" 
              value={uniqueCode} 
              onChange={(e) => setUniqueCode(e.target.value)} 
              className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </label>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
}
