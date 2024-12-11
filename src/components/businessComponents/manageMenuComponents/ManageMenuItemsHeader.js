import React from 'react';
import MenuButtonContainer from './MenuButtonContainer';
import MenuCompletenessComponent from '../manageMenuComponents/ManageMenuItemsMCompleteness';

const ManageMenuItemsHeader = ({ menus, currentMenuId, onCreateMenu, menuItems, 
    menuCompleteness, menuNotCompleteText }) => {
  return (
    <div>
        <MenuButtonContainer menus={menus} currentMenuId={currentMenuId} onCreateMenu={onCreateMenu} />
        <MenuCompletenessComponent menuItems={menuItems} menuCompleteness={menuCompleteness} menuNotCompleteText={menuNotCompleteText} />
    </div>
  );
};

export default ManageMenuItemsHeader;