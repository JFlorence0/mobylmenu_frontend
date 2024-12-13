import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/restaurantStyles/manageVenueStyles/VenueLocationsHeader.css';

const VenueLocationsHeader = ({ numVenues, searchTerm, setSearchTerm }) => {
    const [showOptions, setShowOptions] = useState(false);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
    const toggleShowOptions = () => {
      setShowOptions(!showOptions)
    }

  return (
    <div className="venue-locations-header">
          <div>
            <div className="venue-locations-top">
              <h2 id="header" className="divided-container-header">
                Venue Locations&nbsp;
                <span className="divided-container-header">({numVenues})</span>
                <img
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="You can add, change, or remove venues here. Any menu you make is available at all these venues."
                  className="venue-locations-question"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
                  alt="Info"
                />
              </h2>
            </div>
          </div>
          <div className="venue-locations-options-dropdown-container">
            <div className="venue-locations-options-dropdown">
              <div className="select-btn" onClick={() => {
                toggleShowOptions();
              }}>
                <span className="sBtn-text" style={{ fontSize: '14px' }}>
                  Venue Actions
                </span>
                <i className="bx bx-chevron-down chevron-icon"></i>
              </div>
              {showOptions &&
              <ul className="venue-action-options">
                <li>
                  <Link to="/manage-venue">
                    <img
                      className="venue-locations-plus-sign"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/new-plus.png"
                      alt="Add Venue"
                    />
                    Add Venue
                  </Link>
                </li>
                <li>
                  <Link to="/venues/photos">
                    <img
                      className="venue-locations-upload"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/add-pics2.png"
                      alt="Manage Venue Photos"
                    />
                    Manage Venue Photos
                  </Link>
                </li>
                <li>
                  <Link to="/venues/tags">
                    <img
                      className="venue-locations-tags"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/tag.png"
                      alt="Manage Venue Tags"
                    />
                    Manage Venue Tags
                  </Link>
                </li>
                <li>
                  <Link to="/venues/schedules">
                    <img
                      id="calendar"
                      className="venue-locations-tags"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/calendar-black.png"
                      alt="Manage Schedules"
                    />
                    Manage Schedules
                  </Link>
                </li>
              </ul>
            }
            </div>
            <input
              id="search-venues"
              type="search"
              aria-label="Search"
              name="searched"
              placeholder="Search venues"
              className="seach-container"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
  );
};

export default VenueLocationsHeader;