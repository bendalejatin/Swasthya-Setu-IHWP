import React, { createContext, useState } from 'react';

export const AuthContext = createContext(); // Make sure `AuthContext` is created and exported correctly

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('authToken'));

  const login = (token) => {
    setAuth(token);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
