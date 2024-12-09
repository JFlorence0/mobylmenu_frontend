import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVenue, setIsVenue] = useState(false);

  return (
    <AuthContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        isVenue,
        setIsVenue 
        }}>
      {children}
    </AuthContext.Provider>
  );
};
