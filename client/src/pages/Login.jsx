// src/pages/Login.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/login', { email, password });
      navigate('/');
    } catch (error) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h1 className="text-blue-200 font-bold text-6xl">TaskBite</h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6 bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-xl">
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

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-white text-base">
          Not a member?{' '}
          <a href="/signup" className="font-semibold text-indigo-200 hover:text-white underline">
            Join here!
          </a>
        </p>
      </div>
    </div>
  );
}
