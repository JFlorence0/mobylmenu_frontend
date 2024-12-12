import React, { useState } from 'react';
import '../../styles/userStyles/menuStyles/MenuItemSection.css'

const MenuItemSection = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="center">
      {/* Legend Section */}
      <a className="show-legend">Show Legend</a>
      <div className="legend">
        <div className="legend-row">
          <span className="legend-icon">
            <img
              className="diet-icon"
              id="vegan-icon"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/vegan-symbol.png"
              alt="Vegan icon"
            />
          </span>
          <span className="legend-text">Vegan</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">
            <span style={{ color: 'green' }}>(</span>
            <img
              id="vegan-icon"
              className="diet-icon"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/vegan-symbol.png"
              alt="Vegan option icon"
            />
            <span style={{ color: 'green' }}>)</span>
          </span>
          <span className="legend-text2">Vegan Option</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">
            <img
              className="diet-icon"
              id="vegetarian"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/V2.png"
              alt="Vegetarian icon"
            />
          </span>
          <span className="legend-text">Vegetarian</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">
            <span style={{ color: 'green' }}>(</span>
            <img
              className="diet-icon"
              id="vegetarian"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/V2.png"
              alt="Vegetarian option icon"
            />
            <span style={{ color: 'green' }}>)</span>
          </span>
          <span className="legend-text2">Vegetarian Option</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">
            <img
              className="diet-icon"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/wheat2.png"
              alt="Gluten-free icon"
            />
          </span>
          <span className="legend-text">Gluten-free</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">
            <span style={{ color: 'orange' }}>(</span>
            <img
              className="diet-icon"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/wheat2.png"
              alt="Gluten-free option icon"
            />
            <span style={{ color: 'orange' }}>)</span>
          </span>
          <span className="legend-text2">Gluten-free Option</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">🌶️</span>
          <span className="legend-text">Spicy</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">🥜</span>
          <span className="legend-text">Contains Nuts</span>
        </div>
        <div className="legend-row">
          <span className="legend-icon">
            <img
              className="diet-icon"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/martini6.png"
              alt="Contains alcohol icon"
            />
          </span>
          <span className="legend-text">Contains Alcohol</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-select-container">
        <label htmlFor="category-select">Filter by category</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MenuItemSection;
