import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function DataSet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'add', 'remove', or 'edit'
  const [isAdmin, setIsAdmin] = useState(false); // True for admin, false for user
  const [name, setName] = useState(''); // Username
  const [password, setPassword] = useState(''); // Password
  const [adminCode, setAdminCode] = useState(''); // Admin unique code
  const [userList, setUserList] = useState([]); // List of admins or users
  const [selectedUser, setSelectedUser] = useState(''); // User to be removed or edited
  const [editingUser, setEditingUser] = useState(null); // User data for editing

  const openModal = (actionType, user = null) => {
    setActionType(actionType);
    setIsAdmin(false); // Default to User
    setIsModalOpen(true);

    if (actionType === 'remove' || actionType === 'edit') {
      fetchStoredUsers();
      if (actionType === 'edit' && user) {
        setEditingUser(user);
        setName(user.name);
        setPassword(user.password);
        setAdminCode(user.adminCode || '');
        setIsAdmin(user.isAdmin);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActionType('');
    setName('');
    setPassword('');
    setAdminCode('');
    setIsAdmin(false);
    setSelectedUser('');
    setEditingUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      password: actionType === 'add' ? password : editingUser?.password,
      isAdmin,
      adminCode: isAdmin ? adminCode : null,
      isActive: true, // Set to true on adding or editing as they are logged in
    };

    if (actionType === 'add') {
      localStorage.setItem(`user_${name}`, JSON.stringify(userData));
      setUserList((prev) => [...prev, userData]);
      alert(`${isAdmin ? 'Admin' : 'User'} added successfully!`);
    } else if (actionType === 'remove') {
      if (localStorage.getItem(`user_${selectedUser}`)) {
        localStorage.removeItem(`user_${selectedUser}`);
        setUserList((prev) => prev.filter(user => user.name !== selectedUser));
        alert(`${isAdmin ? 'Admin' : 'User'} removed successfully!`);
      } else {
        alert(`No ${isAdmin ? 'Admin' : 'User'} found with that name.`);
      }
    } else if (actionType === 'edit') {
      localStorage.setItem(`user_${editingUser.name}`, JSON.stringify(userData));
      setUserList((prev) =>
        prev.map(user => (user.name === editingUser.name ? userData : user))
      );
      alert(`${isAdmin ? 'Admin' : 'User'} updated successfully!`);
    }

    closeModal();
  };

  const fetchStoredUsers = () => {
    const allUsers = Object.keys(localStorage).reduce((result, key) => {
      if (key.startsWith('user_')) {
        const user = JSON.parse(localStorage.getItem(key));
        result.push(user);
      }
      return result;
    }, []);
    setUserList(allUsers);
  };

  useEffect(() => {
    fetchStoredUsers();
  }, []);

  return (
    <div className="flex flex-col  min-h-[585px] bg-gray-300 p-4">
      <h1 className="text-3xl font-bold">
        Main Admin Panel
      </h1>
      <div className="w-full max-w-ful mt-6 p-4 bg-white  rounded-lg">
        <h2 className=" text-gray-300 font-semibold p-2">Data Table</h2>
        <table className="w-full p-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.name}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isAdmin ? 'Admin' : 'User'}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openModal('edit', user)}
                    className="text-blue-500 hover:underline"
                  >
                    <PencilIcon className="w-5 h-5 inline mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex w-1/4 gap-3 mt-4">
          <button
            onClick={() => openModal('add')}
            className="w-full px-2 py-1 bg-blue-500 text-white font-semibold text-sm rounded hover:bg-blue-600 transition duration-200"
          >
            Add Admin/User
          </button>
          <button
            onClick={() => openModal('remove')}
            className="w-full px-2 py-1 bg-red-500 text-white font-semibold text-sm rounded hover:bg-red-600 transition duration-200"
          >
            Remove Admin/User
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              {actionType === 'add' ? 'Add' : actionType === 'edit' ? 'Edit' : 'Remove'} {isAdmin ? 'Admin' : 'User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {actionType === 'remove' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Select {isAdmin ? 'Admin' : 'User'} to Remove:
                  </h3>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="" disabled>
                      Select {isAdmin ? 'Admin' : 'User'}
                    </option>
                    {userList
                      .filter(user => (isAdmin ? user.isAdmin : !user.isAdmin))
                      .map((user) => (
                        <option key={user.name} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {(actionType === 'add' || actionType === 'edit') && (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Username"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />

                  {(actionType === 'add' || (actionType === 'edit' && editingUser)) && (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  )}

                  {isAdmin && (
                    <input
                      type="text"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      placeholder="Enter Admin Unique Code"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  )}
                </>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label>Admin</label>
              </div>

              <div className="flex justify-between space-x-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                  {actionType === 'add' ? 'Add' : actionType === 'edit' ? 'Update' : 'Remove'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 px-4 py-2 text-white font-semibold rounded hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
