import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../config';

// Create the context
export const BusinessContext = createContext();

// Create a provider component
export const BusinessProvider = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [displayedMenuItems, setDisplayedMenuItems] = useState([]);

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
  
      setDisplayedMenuItems(response.data);
      return displayedMenuItems;
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

  const createMenuItem = async (menuItemData, menu) => {
    try {
      // Add the menu ID to the FormData
      menuItemData.append('menu', menu);
  
      console.log('Data being sent for new menu item:', menuItemData);
  
      const res = await axios.post(
        `${MOBYLMENU_API_BASE_URL}/menu_item/`,
        menuItemData,
        {
          headers: {
            Authorization: `Token ${restaurantInfo?.token}`, // Add the token here
            'Content-Type': 'multipart/form-data', // Ensure correct content type
          },
        }
      );
  
      const newItem = res.data;
  
      // Update displayedMenuItems with the new item
      setDisplayedMenuItems((prevItems) => ({
        ...prevItems,
        [newItem.id]: newItem,
      }));
  
      return newItem;
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw error;
    }
  };
  
    const updateMenuItem = async (menuItemId, formData) => {
      try {
    
        // Omit 'picture' and 'picture_compressed' fields if they are URLs
        if (formData.get('picture') && typeof formData.get('picture') === 'string' && formData.get('picture').startsWith('http')) {
          formData.delete('picture'); // Remove the field from formData
        }
    
        if (formData.get('picture_compressed') && typeof formData.get('picture_compressed') === 'string' && formData.get('picture_compressed').startsWith('http')) {
          formData.delete('picture_compressed'); // Remove the field from formData
        }
  
        console.log('FORM DATA', formData);
    
        // Send the processed formData to the backend
        const res = await axios.put(
          `${MOBYLMENU_API_BASE_URL}/menu_item/${menuItemId}/`,
          formData, // Send the formData directly
          {
            headers: {
              Authorization: `Token ${restaurantInfo?.token}`,
              'Content-Type': 'multipart/form-data', // Ensure the correct content type
            },
          }
        );
    
        const updatedItem = res.data;
    
        // Update displayedMenuItems with the updated item
        setDisplayedMenuItems((prevItems) => ({
          ...prevItems,
          [updatedItem.id]: updatedItem, // Replace the existing item with the updated one
        }));
    
        return updatedItem;
      } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
      }
    };

  return (
    <BusinessContext.Provider value={{ 
      getAllMenus,
      getAllMenuItems,
      getAllVenues,
      displayedMenuItems
     }}>
      {children}
    </BusinessContext.Provider>
  );
};
