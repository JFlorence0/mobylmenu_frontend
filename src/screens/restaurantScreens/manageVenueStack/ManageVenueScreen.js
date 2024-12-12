import React, { useState } from 'react';
import Header from '../../../components/Header';
import HeaderSpacer from '../../../components/HeaderSpacer';

const VenueForm = ({ venue = {}, onSubmit }) => {
  const [orderingEnabled, setOrderingEnabled] = useState(venue.orderingEnabled || false);
  const [plantBased, setPlantBased] = useState(venue.plantBased || false);
  const [venueName, setVenueName] = useState(venue.name || '');
  const [orderLink, setOrderLink] = useState(venue.orderLink || '');
  const [reservationLink, setReservationLink] = useState(venue.reservationLink || '');
  const [schedule, setSchedule] = useState(venue.schedule || '');
  const [googleAddress, setGoogleAddress] = useState('');
  const [address, setAddress] = useState(venue.address || '');
  const [city, setCity] = useState(venue.city || '');
  const [state, setState] = useState(venue.state || '');
  const [zipcode, setZipcode] = useState(venue.zipcode || '');
  const [country, setCountry] = useState(venue.country || '');
  const [latitude, setLatitude] = useState(venue.latitude || '');
  const [longitude, setLongitude] = useState(venue.longitude || '');
  const [phoneNumber, setPhoneNumber] = useState(venue.phoneNumber || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      orderingEnabled,
      plantBased,
      venueName,
      orderLink,
      reservationLink,
      schedule,
      googleAddress,
      address,
      city,
      state,
      zipcode,
      country,
      latitude,
      longitude,
      phoneNumber,
    });
  };

  return (
    <div>
      <Header
        path={[
          { label: "Venue Locations", link: "/venue-locations" },
          { label: "Manage Venue", link: `/venues/edit/${venue?.id || ''}` },
        ]}
      />
      <HeaderSpacer />
      <div className="form-container-header" id="bigger-margin">
        <h2>{venue.id ? 'Edit Venue' : 'Add Venue'}</h2>
      </div>

      <form id="form" onSubmit={handleSubmit}>
        <div className={`field ${!venue.tablesSubscription ? 'disabled-field' : ''}`}>
          <label htmlFor="ordering_enabled">Enable Ordering From The Table</label>
          <img
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Check this box to enable ordering from the table at this venue. Ensure all menu items have prices before enabling."
            className="question1"
            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
            alt="Info"
          />
          <input
            type="checkbox"
            id="ordering_enabled"
            name="ordering_enabled"
            disabled={!venue.tablesSubscription}
            checked={orderingEnabled}
            onChange={(e) => setOrderingEnabled(e.target.checked)}
            className={!venue.tablesSubscription ? 'disabled-checkbox' : ''}
          />
        </div>
        <br />

        <div className="field">
          <label htmlFor="plant_based">Plant-Based</label>
          <img
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Check the plant-based box if your restaurant is 100% vegan, meaning no animal-product is served at your venue. This will help those with a vegan diet find you."
            className="question1"
            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
            alt="Info"
          />
          <input
            type="checkbox"
            id="plant_based"
            name="plant_based"
            checked={plantBased}
            onChange={(e) => setPlantBased(e.target.checked)}
          />
        </div>
        <br />

        <label htmlFor="venue_name">Name of Venue</label>
        <input
          type="text"
          id="venue_name"
          name="venue_name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
        />
        <small className="error-message" id="venue-name-error"></small>
        <br />

        <label htmlFor="order-link">Delivery Link</label>
        <input
          type="text"
          id="order-link"
          name="order-link"
          value={orderLink}
          onChange={(e) => setOrderLink(e.target.value)}
        />
        <small className="error-message" id="order-link-error"></small>
        <br />

        <label htmlFor="reservation-link">Reservation Link</label>
        <input
          type="text"
          id="reservation-link"
          name="reservation-link"
          value={reservationLink}
          onChange={(e) => setReservationLink(e.target.value)}
        />
        <small className="error-message" id="reservation-link-error"></small>
        <br />

        <label htmlFor="schedule">Which schedule will this location use?</label>
        <img
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Create a schedule and assign that schedule to a venue, so customers know your hours of operation. If you haven't created one yet, you can leave it blank for now, and fill it in later."
          className="question1"
          src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
          alt="Info"
        />
        <input
          type="text"
          id="schedule"
          name="schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <br />

        <label htmlFor="id-google-address">Address</label>
        <img
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Entering your address with autofill allows us to pull your latitude and longitude so we can show your restaurant to customers near you."
          className="question1"
          src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
          alt="Info"
        />
        <input
          type="text"
          placeholder="*Begin typing address"
          id="id-google-address"
          name="google_address"
          value={googleAddress}
          onChange={(e) => setGoogleAddress(e.target.value)}
        />
        <br />

        <label htmlFor="address">Street Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <small className="error-message" id="address-error"></small>
        <br />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <small className="error-message" id="city-error"></small>
        <br />

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <small className="error-message" id="state-error"></small>
        <br />

        <label htmlFor="zipcode">Zip-code</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <small className="error-message" id="zipcode-error"></small>
        <br />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <small className="error-message" id="country-error"></small>
        <br />

        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br />

        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br />

        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <small className="error-message" id="phone-number-error"></small>
        <br />

        <button className="form-button" id="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VenueForm;

