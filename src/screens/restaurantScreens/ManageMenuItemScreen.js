import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BusinessContext } from '../../contexts/BusinessContext';
import Header from '../../components/Header';
import HeaderSpacer from '../../components/HeaderSpacer';
import CustomizationForm from '../../components/businessComponents/manageMenuComponents/CustomizationForm';

import '../../styles/restaurantStyles/manageMenuStyles/ManageMenuItemFormStyles.css'

const ManageMenuItemScreen = () => {
    const { updateMenuItem, createMenuItem } = useContext(BusinessContext);
    const location = useLocation();
    const nav = useNavigate();

    // Access data from location state or set defaults
    const menuItem = location.state?.menuItem || null;
    const categories = location.state?.categories || null;
    const orderingEnabled = location.state?.orderingEnabled || false;
    const venue = location.state?.venue || null;

    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [price, setPrice] = useState(menuItem?.price || '');
    const [imageUri, setImageUri] = useState(menuItem?.picture || '');
    const [itemType, setItemType] = useState(menuItem?.item_type || '');
    const [filteredCategories, setFilteredCategories] = useState(categories || []);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [formState, setFormState] = useState({
        name: menuItem?.name || '',
        itemType: menuItem?.itemType || '',
        price: menuItem?.price || '',
        description: menuItem?.description || '',
        imageUri: menuItem?.image || null,
        dietaryOptions: {
            vegan: menuItem?.vegan || false,
            veganOption: menuItem?.veganOption || false,
            vegetarian: menuItem?.vegetarian || false,
            vegetarianOption: menuItem?.vegetarianOption || false,
            glutenFree: menuItem?.glutenFree || false,
            glutenFreeOption: menuItem?.glutenFreeOption || false,
            spicy: menuItem?.spicy || false,
            containsNuts: menuItem?.containsNuts || false,
            containsAlcohol: menuItem?.containsAlcohol || false,
        },
    });

    const [customizableContainerVisible, setCustomizableContainerVisible] = useState(
        menuItem?.customization_groups && menuItem.customization_groups.length > 0
    );

    const [groups, setGroups] = useState(() => {
        if (menuItem?.customization_groups && menuItem.customization_groups.length > 0) {
            return menuItem.customization_groups.map((group) => ({
                id: group.id || null, // Retain ID if present
                name: group.name || '',
                required: group.required || false,
                minSelections: group.min_selections || 1,
                maxSelections: group.max_selections || 1,
                options: group.options.map((option) => ({
                    id: option.id || null, // Retain ID if present
                    name: option.name || '',
                    priceModifier: option.price_modifier || '',
                    description: option.description || '',
                })),
            }));
        }

        // For new items, initialize with default values
        return [
            {
                id: null,
                name: '',
                required: false,
                minSelections: 1,
                maxSelections: 1,
                options: [],
            },
        ];
    });

    // Dietary options state
    const [dietaryOptions, setDietaryOptions] = useState({
      vegan: menuItem?.vegan || false,
      vegan_option: menuItem?.vegan_option || false,
      vegetarian: menuItem?.vegetarian || false,
      vegetarian_option: menuItem?.vegetarian_option || false,
      gluten_free: menuItem?.gluten_free || false,
      gluten_free_option: menuItem?.gluten_free_option || false,
      spicy: menuItem?.spicy || false,
      contains_nuts: menuItem?.contains_nuts || false,
      contains_alcohol: menuItem?.contains_alcohol || false,
    });

    const toggleCustomizableContainerVisible = () => {
      setCustomizableContainerVisible(!customizableContainerVisible);
    }

    const toggleDietaryOption = (key) => {
      setDietaryOptions((prevOptions) => ({
        ...prevOptions,
        [key]: !prevOptions[key],
      }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setFormState((prev) => ({
            ...prev,
            imageUri: URL.createObjectURL(e.target.files[0]), // Update with file object
        }));
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Replace the current image with the new selection
        setImageUri(result.assets[0].uri);
      }
    };

    const handleSave = async () => {
        try {
            const {
                name,
                itemType,
                price,
                description,
                imageUri,
                dietaryOptions,
            } = formState;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('item_type', itemType);

            if (imageUri && !imageUri.startsWith('http')) {
                const sanitizedFileName = name.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                const fileName = `${sanitizedFileName}.jpg`;

                formData.append('picture', {
                    uri: imageUri,
                    name: fileName,
                    type: 'image/jpeg',
                });
            }

            const validGroups = groups.filter((group) => group.name && group.options.length > 0);

            if (validGroups.length > 0) {
                formData.append(
                    'customizations',
                    JSON.stringify(
                        validGroups.map((group) => ({
                            ...(group.id ? { id: group.id } : {}),
                            name: group.name,
                            required: group.required,
                            min_selections: group.minSelections,
                            max_selections: group.maxSelections,
                            options: group.options.map((option) => ({
                                ...(option.id ? { id: option.id } : {}),
                                name: option.name,
                                price_modifier: option.priceModifier,
                                description: option.description,
                            })),
                        }))
                    )
                );
            }

            Object.entries(dietaryOptions).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if (menuItem) {
                await updateMenuItem(menuItem.id, formData);
            } else {
                await createMenuItem(formData, venue?.menu?.id);
            }

            navigation.goBack();
        } catch (error) {
            console.error('Error saving menu item:', error);
        }
    };

    return (
        <div className="form-container1">
          <Header path={[{"label": "Manage Menu", "link": "/manage-menu"},
            {"label": "Manage Menu Item", "link": "/manage-menu-item"}]} />
          <HeaderSpacer />
            <div className="form-container-header">
                <h2>{menuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                type="number"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                className="form-control"
                value={itemType}
                onChange={(e) => handleCategoryInputChange(e.target.value)}
                placeholder="Type or select a category"
              />
              {showDropdown && (
                <div className="dropdown-container">
                  {filteredCategories.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      onClick={() => handleCategorySelect(item)}
                      className="dropdown-item"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Image</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {imageUri && <img src={imageUri} alt="Selected" className="image-preview" />}
                <button type="button" className="btn btn-secondary" onClick={pickImage}>
                  Select Image
                </button>
              </div>
            </div>

            <div className="checkbox-form-group">
              <h3 className="category-label">Dietary Options</h3>
              <div className="checkbox-outer-container">
                {Object.keys(dietaryOptions)
                  .reduce((rows, key, index, keys) => {
                    if (index % 2 === 0) rows.push(keys.slice(index, index + 2)); // Create chunks of 2
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <div key={rowIndex} className="checkbox-row">
                      {row.map((key) => (
                        <div key={key} className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={dietaryOptions[key]}
                            onChange={() => toggleDietaryOption(key)}
                            id={key}
                          />
                          <span htmlFor={key}>{key.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleCustomizableContainerVisible}
              >
                {customizableContainerVisible ? '-' : '+'} Is this item customizable?
              </button>
            </div>

            {customizableContainerVisible && (
              <CustomizationForm
                groups={groups}
                setGroups={setGroups}
                maxGroupsLimit={5}
              />
            )}

            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!isFormValid}
              >
                Save
              </button>
            </div>

        </div>
    );
};

export default ManageMenuItemScreen;