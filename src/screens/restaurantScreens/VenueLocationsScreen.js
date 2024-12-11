import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BusinessContext } from '../../contexts/BusinessContext';

const VenueLocationsScreen = ({
  maxVenuesPerPage = 50,
  subscribedToSpotlightVenueIds,
  subscribedToTablesVenueIds,
  venuesWithHubs,
  isSubscribed,
}) => {
  const { getAllVenues } = useContext(BusinessContext);
  const [venues, setVenues] = useState([]);
  const [numVenues, setNumVenues] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);

  useEffect(() => {
    const fetchAllVenues = async () => {
      const fetchedVenues = await getAllVenues();
      console.log(venues);
      setVenues(fetchedVenues);
      setNumVenues(fetchedVenues?.length);
    };

    fetchAllVenues();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const togglePopup = (venue) => {
    setCurrentVenue(venue);
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleEditPopup = (venue) => {
    setCurrentVenue(venue);
    setIsEditPopupOpen(!isEditPopupOpen);
  };

  return (
    <div className="format-page-container">
      <div className="section-header">
        <div className="info-header">
          <div>
            <div className="header-container">
              <h2 id="header" className="help-container-header">
                Venue Locations&nbsp;
                <span className="count">({numVenues})</span>
                <img
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="You can add, change, or remove venues here. Any menu you make is available at all these venues."
                  className="question"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
                  alt="Info"
                />
              </h2>
            </div>
          </div>
          <div className="an2">
            <div className="dropdown">
              <div className="select-btn" onClick={() => {}}>
                <span className="sBtn-text" style={{ fontSize: '14px' }}>
                  Venue Actions
                </span>
                <i className="bx bx-chevron-down chevron-icon"></i>
              </div>
              <ul className="options">
                <li>
                  <Link to="/venues/add">
                    <img
                      className="plus-sign"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/new-plus.png"
                      alt="Add Venue"
                    />
                    Add Venue
                  </Link>
                </li>
                <li>
                  <Link to="/venues/photos">
                    <img
                      className="upload"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/add-pics2.png"
                      alt="Manage Venue Photos"
                    />
                    Manage Venue Photos
                  </Link>
                </li>
                <li>
                  <Link to="/venues/tags">
                    <img
                      className="tags"
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
                      className="tags"
                      src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/calendar-black.png"
                      alt="Manage Schedules"
                    />
                    Manage Schedules
                  </Link>
                </li>
              </ul>
            </div>
            <input
              id="search"
              type="search"
              aria-label="Search"
              name="searched"
              placeholder="Search venues"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ marginBottom: '1rem' }}
            />
          </div>
        </div>

        {/* Venue List */}
        <div id="section-list-container" className="section-list-container">
          {venues?.map((venue) => (
            <div className="item-container" key={venue.id}>
              <div className="item">
                <Link to={`/venues/${venue.id}`}>
                  {venue.venue_name}
                </Link>
                <br />
                <span>{venue.address}</span>
                <br />
                <span>
                  {venue.city}, {venue.state}
                </span>
                <br />
                {venue.zipcode}
              </div>
              <div className="action-container">
                <Link to={`/venues/edit/${venue.id}`} className="item-options">
                  Edit Venue Info
                </Link>
                <Link to={`/venues/qr/${venue.id}`} className="item-options">
                  Print QR Codes
                </Link>
                {subscribedToTablesVenueIds?.includes(venue.id) && (
                  <Link to={`/venues/orders/${venue.id}`} className="item-options">
                    Manage Orders
                  </Link>
                )}
                {venuesWithHubs?.includes(venue.id) && (
                  <Link to={`/venues/hubs/${venue.id}`} className="item-options">
                    Network Hubs
                  </Link>
                )}
                {subscribedToSpotlightVenueIds?.includes(venue.id) && (
                  <Link to={`/venues/spotlight/${venue.id}`} className="item-options">
                    Spotlight
                  </Link>
                )}
                <button
                  className="item-options item-delete"
                  onClick={() => togglePopup(venue)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Popup */}
      {isPopupOpen && (
        <div className="popup" id="popup">
          <h2>Delete Confirmation</h2>
          <p>Are you sure you want to delete this venue?</p>
          <button
            id="delete-button"
            className="delete-popup-button"
            onClick={() => {
              // Perform delete action here
              setIsPopupOpen(false);
            }}
          >
            Remove Venue
          </button>
          <button
            id="cancel-button"
            className="cancel-button"
            onClick={() => setIsPopupOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueLocationsScreen;
