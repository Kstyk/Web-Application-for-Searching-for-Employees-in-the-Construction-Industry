import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AuthContext = createContext();

const api = axios.create({
    baseURL: 'http://localhost:5072/api',
  });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || '');
  const [isLoggedIn, setLoggedIn] = useState(!!token);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserRole();
    }
  }, [isLoggedIn]);

  const login = async (credentials) => {
    try {
      const response = await api.post('/account/login', credentials);

      const token = 'Bearer ' + response.data;

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

      setLoggedIn(true);
      login(userData);
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error; 
    }
  };

  const fetchUserRole = async () => {
    if (isLoggedIn) {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/account/my-profile', {
          headers: {
            Authorization: `${token}`,
          },
        });

        const user = response.data;

        setUserRole(user.roleId);

      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
