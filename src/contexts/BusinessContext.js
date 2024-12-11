import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../config';

// Create the context
export const BusinessContext = createContext();

// Create a provider component
export const BusinessProvider = ({ children }) => {
  const { userData } = useContext(AuthContext);

  const getAllMenus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}all_menus/`, {
        headers: {
          'Authorization': `Token ${userData?.token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching menus:', error);
      throw error;
    }
  };

  const getAllMenuItems = async (menu_id) => {
    try {
      const response = await axios.get(`${BASE_URL}menus/items/${menu_id}/`, {
        headers: {
          'Authorization': `Token ${userData?.token}`,
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const getAllVenues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}venues/`, {
        headers: {
          'Authorization': `Token ${userData?.token}`,
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching all venues:', error);
      throw error;
    }
  };


  return (
    <BusinessContext.Provider value={{ 
      getAllMenus,
      getAllMenuItems,
      getAllVenues
     }}>
      {children}
    </BusinessContext.Provider>
  );
};
