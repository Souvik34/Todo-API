// src/components/AuthForm.js
import { useState } from 'react';

export default function AuthForm({ onSubmit, isSignup = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-xl p-8 max-w-md w-full mx-auto mt-16 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(email, password); }} className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded bg-white bg-opacity-30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 rounded bg-white bg-opacity-30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded transition"
        >
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
