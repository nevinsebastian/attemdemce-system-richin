import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
        {/* Logo and Branding */}
        <div className="text-center mb-6">
         
          <h2 className="text-4xl font-bold text-indigo-700">RosResearch</h2>
          <p className="text-xl text-gray-500 mt-2">Welcome Back! Please login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="block w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>

        {/* Optional: Footer links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account? 
            <a href="/signup" className="text-indigo-600 hover:underline"> Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
