// src/pages/Signup.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // install react-icons if needed

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await api.post('/signup', { email, username, password });
      navigate('/');
    } catch (e) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h1 className="text-blue-200 font-bold text-6xl">TaskBite</h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6 bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-xl">
          
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-white">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-2 pr-10 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-white">Confirm Password</label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-2 pr-10 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white font-semibold transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-white text-base">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-indigo-200 hover:text-white underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
