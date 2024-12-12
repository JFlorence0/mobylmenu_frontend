import React from 'react';
import Header from '../../components/Header';
import HeaderSpacer from '../../components/HeaderSpacer';

const ManageVenueScreen = () => {
  return (
    <div>
      <Header path={[
        {"label": "Venue Locations", "link": "/venue-locations"},
        {"label": "Manage Venue", "link": "/manage-venue"}]}
      />
        <h1>ManageVenueScreen</h1>
    </div>
  );
};

export default ManageVenueScreen;