import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import type { AxiosError } from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setToken = useAuthStore((s) => s.setToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://feedbackapp-ldqr.onrender.com/auth/token',
        new URLSearchParams({ username, password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      setToken(response.data.access_token);
      setError('');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail?: string }>;

      if (axiosError.response) {
        const detail = axiosError.response.data?.detail;
        setError(`Login failed: ${detail || axiosError.response.statusText}`);
      } else if (axiosError.message) {
        setError(`Login failed: ${axiosError.message}`);
      } else {
        setError('Login failed: Unknown error');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}
    </div>
  );
};

export default LoginForm;
