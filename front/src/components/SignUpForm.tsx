import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const setToken = useAuthStore((s) => s.setToken);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await axios.post(
        'https://feedbackapp-ldqr.onrender.com/auth/',
        { username, password },
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );

      setToken(response.data.access_token);
      setSuccess('Account created successfully! You are now logged in.');
      setError('');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      if (axiosError.response) {
        setError(`Sign-up failed: ${axiosError.response.data?.detail || axiosError.response.statusText}`);
      } else {
        setError(`Sign-up failed: ${axiosError.message}`);
      }
      setSuccess('');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
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
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
      {success && <div className="mt-4 text-green-600">{success}</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default SignUpForm;
