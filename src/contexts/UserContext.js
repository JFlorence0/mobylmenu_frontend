import React, { createContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getVenueById = async (venueId) => {
    try {
      const response = await axios.get(`${BASE_URL}venue/${venueId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching venue:", error);
      throw error;
    }
  }

  return (
    <UserContext.Provider value={{
        user,
        setUser,
        getVenueById
         }}>
      {children}
    </UserContext.Provider>
  );
};
