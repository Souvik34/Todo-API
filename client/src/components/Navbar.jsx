import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa'; // Default avatar icon

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername && storedUsername !== 'undefined' && storedUsername !== '') {
      setUsername(storedUsername);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getInitials = () => {
    return username
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <nav className="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 px-6 md:px-12 py-4 shadow-lg text-white flex justify-between items-center">
      <Link
        to="/todos"
        className="text-2xl font-extrabold tracking-wide hover:text-indigo-200 transition duration-200"
      >
        <span className="inline-block -translate-y-1 mr-1">📝</span> TaskBite
      </Link>

      <div className="flex items-center space-x-5">
        <Link
          to="/todos"
          className="text-lg font-medium hover:text-indigo-200 transition duration-200"
        >
          Home
        </Link>

        <div className="flex items-center gap-2">
          {username ? (
            <div className="w-9 h-9 rounded-full bg-white text-purple-700 font-bold flex items-center justify-center shadow-inner uppercase">
              {getInitials()}
            </div>
          ) : (
            <FaUserCircle className="w-9 h-9 text-white/90" />
          )}
          {username && (
            <span className="hidden sm:inline-block font-medium text-white truncate max-w-[120px]">
              {username}
            </span>
          )}
        </div>

        <button
          onClick={logout}
          className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
