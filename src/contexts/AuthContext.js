import React, { createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVenue, setIsVenue] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  console.log(userData);

  // Load user from localStorage on app load
  useEffect(() => {
    let savedUserData = localStorage.getItem('userData');
    savedUserData = JSON.parse(savedUserData)
    if (savedUserData?.token && savedUserData?.user?.is_venue) {
      setUserData(savedUserData);
      setIsLoggedIn(true);
      setIsVenue(savedUserData?.user?.is_venue);
      console.log('LOG SAVED USER DATA', savedUserData);
    }
  }, []);

  const checkEmailAvailability = async (email) => {
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

  const login = async (username, password) => { 
    try {
      // Send request with the correct payload structure
      const response = await axios.post(`${BASE_URL}login_web/`, {
        username,
        password
      });
  
      if (response.status === 200) {
        const fetchedUserData = response.data;
        console.log(fetchedUserData);
        setUserData(fetchedUserData);
        setIsLoggedIn(true);
        setIsVenue(fetchedUserData?.user?.is_venue);
        localStorage.setItem('userData', JSON.stringify(fetchedUserData));

      } else {
        console.log('INVALID CRED')
        setErrorMessage("Invalid credentials. Check your email, password, and venue ID.");
        return
      }
    } catch (error) {
      console.log('SOMETHING WENT WRONG')
      setErrorMessage("Invalid credentials. Check your email, password, and venue ID.");
      return;
    }
  };

  return (
    <AuthContext.Provider value={{
        checkEmailAvailability,
        isLoggedIn,
        setIsLoggedIn,
        isVenue,
        setIsVenue,
        errorMessage,
        setErrorMessage,
        login,
        userData,
        setUserData
        }}>
      {children}
    </AuthContext.Provider>
  );
};
