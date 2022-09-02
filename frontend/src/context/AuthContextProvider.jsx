import React, { useState } from 'react';
import AuthContext from './AuthContext.js';

function AuthContextProvider({ children }) {
  const getToken = () => localStorage.getItem('token');

  const isAuthorized = () => {
    const token = getToken();
    return !!token;
  };

  const [authStatus, setAuthStatus] = useState(isAuthorized());
  return (
    <AuthContext.Provider value={
      {
        authStatus,
      }
    }>{children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
