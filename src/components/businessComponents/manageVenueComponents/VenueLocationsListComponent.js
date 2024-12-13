import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../../styles/restaurantStyles/manageVenueStyles/VenueLocationsList.css';

const VenueLocationsListComponent = ({ venues, subscribedToSpotlightVenueIds,
    subscribedToTablesVenueIds, venuesWithHubs
  }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [currentVenue, setCurrentVenue] = useState(null);

    const togglePopup = (venue) => {
        setCurrentVenue(venue);
        setIsPopupOpen(!isPopupOpen);
      };
    
      const toggleEditPopup = (venue) => {
        setCurrentVenue(venue);
        setIsEditPopupOpen(!isEditPopupOpen);
      };

  return (
    <div id="venue-locations-list-container" className="venue-locations-list-container">
        {venues?.map((venue) => (
        <div className="venue-locations-list-item-container" key={venue.id}>
            <div className="venue-locations-list-item">
                <Link to={`/venues/${venue.id}`} className="venue-name">
                    {venue.venue_name}
                </Link>
                <span className="venue-information-text">{venue.address}</span>
                <span className="venue-information-text">
                    {venue.city}, {venue.state}
                </span>
                <span className="venue-information-text">
                    {venue.zipcode}
                </span>
            </div>
            <div className="venue-locations-list-action-container">
            <Link
                to={{
                    pathname: `/manage-venue`,
                }}
                state={{
                    venue,
                }}
                className="item-options"
                >
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
            <a
                href="#"
                className="item-options item-delete"
                onClick={(e) => {
                    e.preventDefault();
                    togglePopup(venue);
                }}
                >
                Delete Item
            </a>
            </div>
        </div>
        ))}
    </div>
  );
};

export default VenueLocationsListComponent;