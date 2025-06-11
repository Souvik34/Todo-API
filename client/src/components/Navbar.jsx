// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post('/logout');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">📝 TodoApp</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <button
          onClick={logout}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
