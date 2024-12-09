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

  const getMenuItems = async (venue) => {
    if (!venue || !venue.id) {
        return null;
    }
    
    try {
        const res = await axios.get(`${BASE_URL}get_menu_items/${venue.id}/`);
        const response = res.data;
        return response;
    } catch (err) {
        console.log(`Error getting menuItems: ${err}`);
        return null;
    }
  };

  return (
    <UserContext.Provider value={{
        user,
        setUser,
        getVenueById,
        getMenuItems
         }}>
      {children}
    </UserContext.Provider>
  );
};
