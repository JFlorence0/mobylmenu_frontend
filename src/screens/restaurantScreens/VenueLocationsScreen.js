import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BusinessContext } from '../../contexts/BusinessContext';
import VenueLocationsListComponent from '../../components/businessComponents/venueLocationComponents/VenueLocationsListComponent';
import DeleteConfirmationWindow from '../../components/businessComponents/DeleteConfirmationWindow';
import VenueLocationsHeader from '../../components/businessComponents/venueLocationComponents/VenueLocationsHeader';
import Header from '../../components/Header';
import HeaderSpacer from '../../components/HeaderSpacer';

const VenueLocationsScreen = ({
  maxVenuesPerPage = 50,
  isSubscribed,
}) => {
  const { getAllVenues } = useContext(BusinessContext);
  const [venues, setVenues] = useState([]);
  const [numVenues, setNumVenues] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirmationWindow, setShowDeleteConfirmationWindow] = useState(false);
  const [subscribedToSpotlightVenueIds, setSubscribedToSpotlightVenueIds] = useState([]);
  const [subscribedToTablesVenueIds, setSubscribedToTablesVenueIds] = useState([]);
  const [venuesWithHubs, setVenuesWithHubs] = useState([]);

  useEffect(() => {
    const fetchAllVenues = async () => {
      const fetchedVenues = await getAllVenues();
      setVenues(fetchedVenues);
      setNumVenues(fetchedVenues?.length);
    };

    fetchAllVenues();
  }, []);

  return (
    <div className="format-page-container">
      <Header path={[{ label: 'Venue Locations', link: '/venue-locations' }]} />
      <HeaderSpacer />
      <div className="section-header">
        <VenueLocationsHeader numVenues={numVenues} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <VenueLocationsListComponent venues={venues} subscribedToSpotlightVenueIds={subscribedToSpotlightVenueIds}
          subscribedToTablesVenueIds={subscribedToTablesVenueIds} venuesWithHubs={venuesWithHubs}
        />
      </div>

      {/* Delete Popup */}
      {showDeleteConfirmationWindow && (
        <DeleteConfirmationWindow 
          title={"Delete Confirmation"}
          confirmationText={"Are you sure you want to delete this venue?"}
          setIsVisible={setShowDeleteConfirmationWindow}
          onDelete={() => {setShowDeleteConfirmationWindow(false)}}
        />
      )}
    </div>
  );
};

export default VenueLocationsScreen;
