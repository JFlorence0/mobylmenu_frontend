import React, { useEffect, useContext, useState} from 'react';
import { BusinessContext } from '../../contexts/BusinessContext';
import ManageMenuItemsSection from '../../components/businessComponents/manageMenuComponents/ManageMenuItemsSection';
import ManageMenuItemsHeader from '../../components/businessComponents/manageMenuComponents/ManageMenuItemsHeader';
import '../../styles/restaurantStyles/ManageMenuStyles.css';

const ManageMenuScreen = () => {
  const { getAllMenus, getAllMenuItems } = useContext(BusinessContext);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuItems, setMenuItems] = useState()
  const [categories, setCategories] = useState([]);

  const onAdd = () => {

  }
  const onEdit = () => {
    
  }
  const onDelete = () => {
    
  }

  const onCreateMenu = () => {

  }

  const menuCompleteness = '0%'
  const menuNotCompleteText = 'Menu incomplete'

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch all menus
        const fetchedMenus = await getAllMenus();
        if (fetchedMenus) {
          setMenus(fetchedMenus);

          // Find the main menu
          const mainMenu = fetchedMenus.find(menu => menu.main_menu === true);
          if (mainMenu) {
            setSelectedMenu(mainMenu);

            // Set categories in the order they are received
            if (mainMenu.categories && mainMenu.categories.length > 0) {
              const sortedCategories = mainMenu.categories.sort((a, b) => a.order - b.order);
              setCategories(sortedCategories);
            }

            // Fetch menu items for the main menu
            const fetchedMenuItems = await getAllMenuItems(mainMenu.id);
            if (fetchedMenuItems) {
              setMenuItems(fetchedMenuItems);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData(); // Call the function
  }, [getAllMenus, getAllMenuItems]);

  return (
    <div>
        <ManageMenuItemsHeader menus={menus} currentMenuId={selectedMenu?.id} onCreateMenu={onCreateMenu}
          menuItems={menuItems} menuCompleteness={menuCompleteness} menuNotCompleteText={menuNotCompleteText}
        />
        <ManageMenuItemsSection categories={categories} menuItems={menuItems} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
    </div>
  );
};

export default ManageMenuScreen;