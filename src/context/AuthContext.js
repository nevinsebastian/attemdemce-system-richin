import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://13.233.103.177:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: '',
          username,
          password,
          scope: '',
          client_id: '',
          client_secret: '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);

        // Store the token in localStorage after login
        localStorage.setItem('auth_token', data.token);  // Store token here
        return true;
      } else {
        console.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');  // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
