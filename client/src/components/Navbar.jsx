import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 px-8 py-4 shadow-md text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-indigo-200 transition">
        📝 TaskBite
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-lg hover:text-indigo-200 transition duration-200 font-medium"
        >
          Home
        </Link>
        {username && (
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white text-purple-700 font-bold flex items-center justify-center shadow-inner text-lg uppercase">
              {username.charAt(0)}
            </div>
            <span className="hidden sm:inline text-base font-medium">{username}</span>
          </div>
        )}
        <button
          onClick={logout}
          className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
