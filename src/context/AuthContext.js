import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch('https://13.233.103.177:8000/login', {
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
        const { user } = data;

        // Store token and role
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('role', user.role_name);

        // Fetch user details by user_id
        const userDetails = await fetchUserDetails(user.user_id);
        setUser(userDetails);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const fetchUserDetails = async (userId) => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch(`https://13.233.103.177:8000/admin/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch user details');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
