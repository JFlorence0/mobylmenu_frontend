import React, { createContext, useState } from 'react';
import { BASE_URL } from '../config';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVenue, setIsVenue] = useState(false);

  const checkEmailAvailability = async (email) => {
    console.log('TRGGER', email)
    try {
      const response = await fetch(`${BASE_URL}check_email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch email availability');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking email availability:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
        checkEmailAvailability,
        isLoggedIn,
        setIsLoggedIn,
        isVenue,
        setIsVenue
        }}>
      {children}
    </AuthContext.Provider>
  );
};
