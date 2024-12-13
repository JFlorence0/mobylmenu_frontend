import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BusinessContext } from '../../../contexts/BusinessContext';
import VenueLocationsListComponent from '../../../components/businessComponents/manageVenueComponents/VenueLocationsListComponent';
import DeleteConfirmationWindow from '../../../components/businessComponents/DeleteConfirmationWindow';
import VenueLocationsHeader from '../../../components/businessComponents/manageVenueComponents/VenueLocationsHeader';
import NavigationSidebar from '../../../components/NavigationSidebar';
import '../../../styles/baseStyles/Base.css';

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
    <div>
      <Helmet>
        <title>{`Venue Locations | MobylMenu`}</title>
      </Helmet>
      <NavigationSidebar />
    
      <div className="division-container">
        <div className="left-divided-container">
          <VenueLocationsHeader numVenues={numVenues} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <VenueLocationsListComponent venues={venues} subscribedToSpotlightVenueIds={subscribedToSpotlightVenueIds}
            subscribedToTablesVenueIds={subscribedToTablesVenueIds} venuesWithHubs={venuesWithHubs}
          />

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
        <div className="right-divided-container">
          <h3 className="divided-container-header">More, For Less</h3>
        </div>
      </div>
    </div>
  );
};

export default VenueLocationsScreen;
