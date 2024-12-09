import React from 'react';
import CarouselItem from './CarouselItem';

const CarouselContainer = ({
  selectedCategory,
  categories,
  menuItems,
  venue,
  moveLeft,
  moveRight,
  orderingEnabled,
}) => {
  
  // Filter categories and items based on the selected category
  const filteredCategories =
    selectedCategory === 'All'
      ? categories
      : categories.filter((category) => category.name === selectedCategory);

  return (
    <div className="center">
      {filteredCategories?.map((category) => {
        // Filter menu items for the current category
        const categoryItems = menuItems.filter((item) => item.item_type === category.name);

        return (
          <div key={category.name} className="category-section">
            {/* Category Header */}
            <div className="category-header">
              <h3>{category.name}</h3>
            </div>

            {/* Carousel for the Category */}
            <div className="carousel-container">
              {/* Left Navigation Button */}
              <img
                className="carousel-button left"
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-circle-l.png"
                alt={`Left Chevron for ${category.name}`}
                onClick={() => moveLeft(category.name)}
              />

              {/* Carousel Viewport */}
              <div className="carousel-viewport">
                <div
                  className="carousel-content"
                  id={`carousel-${category.name}`}
                  data-current-index="0"
                >
                  {categoryItems.map((menuItem) => (
                    <CarouselItem
                      key={menuItem.id}
                      menuItem={menuItem}
                      venue={venue}
                      orderingEnabled={orderingEnabled}
                    />
                  ))}
                </div>
              </div>

              {/* Right Navigation Button */}
              <img
                className="carousel-button right"
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-circle-r.png"
                alt={`Right Chevron for ${category.name}`}
                onClick={() => moveRight(category.name)}
              />
            </div>

            {/* Dots for Navigation */}
            <div className="dots-container" id={`dots-${category.name}`}>
              {categoryItems.map((_, index) => (
                <span key={index} className="dot" data-index={index}></span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarouselContainer;
