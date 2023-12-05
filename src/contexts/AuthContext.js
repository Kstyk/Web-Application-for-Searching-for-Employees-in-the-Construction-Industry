import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AuthContext = createContext();

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
  });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || '');
  const [isLoggedIn, setLoggedIn] = useState(!!token);

  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await api.post('/account/login', credentials);

      const token = 'Bearer ' + response.data;
      console.log('Token:', token);

      localStorage.setItem('token', token);

      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    setToken('');

    setLoggedIn(false);

    navigate('/auth/login');
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/account/register', userData);

      const token = response.data;
      console.log('Token:', token);

      localStorage.setItem('token', token);

      setLoggedIn(true);
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error; 
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
