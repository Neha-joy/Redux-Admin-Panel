import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataSet from './Components/DataSet';
import Login from './Components/Login';
import AdminHome from './Components/AdminHome';
import UserHome from './Components/UserHome';

export default function App() {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-black text-white">
          <Link to="/" className="mr-4">Login</Link>
        </nav>

        <Routes>
          <Route path="/DataSet" element={<DataSet />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/user-home" element={<UserHome />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="p-4">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
