import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Autocomplete from 'react-google-autocomplete';

import FormHeader from '../../../components/businessComponents/FormHeader';
import FormHeaderSpacer from '../../../components/businessComponents/FormHeaderSpacer';
import '../../../styles/baseStyles/Base.css'
import FormButton from '../../../components/businessComponents/buttons/FormButton';
import { GOOGLE_API_KEY } from '../../../config';
import { BusinessContext } from '../../../contexts/BusinessContext';

const ManageVenueScreen = () => {
  const location = useLocation();
  const venue = location?.state?.venue;
  const { createVenue, updateVenue } = useContext(BusinessContext);
  const nav = useNavigate();
  const [formIsValid, setFormIsValid] = useState();

  const [formData, setFormData] = useState({
    ordering_enabled: venue?.ordering_enabled || false,
    plant_based: venue?.plant_based || false,
    venue_name: venue?.venue_name || '',
    order_link: venue?.order_link || '',
    reservation_link: venue?.reservation_link || '',
    schedule: venue?.schedule || '',
    address: venue?.address || '',
    city: venue?.city || '',
    state: venue?.state || '',
    zipcode: venue?.zipcode || '',
    country: venue?.country || '',
    latitude: venue?.latitude || '',
    longitude: venue?.longitude || '',
    phone_number: venue?.phone_number || '',
  });

  const validateForm = () => {
    const { venue_name, address, city, state, zipcode, country, latitude, longitude } = formData;

    // Check if all required fields are non-empty
    return (
      venue_name.trim() !== '' &&
      address.trim() !== '' &&
      city.trim() !== '' &&
      state.trim() !== '' &&
      zipcode.trim() !== '' &&
      country.trim() !== '' &&
      latitude !== '' &&
      longitude !== ''
    );
  };

  // Update form validity whenever formData changes
  useEffect(() => {
    setFormIsValid(validateForm());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePlaceSelected = (place) => {
    const addressComponents = place.address_components;
    const location = place.geometry.location;

    const getComponent = (type) =>
      addressComponents.find((component) =>
        component.types.includes(type)
      )?.long_name || '';

    setFormData({
      ...formData,
      address: getComponent('street_address') || getComponent('route'),
      city: getComponent('locality'),
      state: getComponent('administrative_area_level_1'),
      zipcode: getComponent('postal_code'),
      country: getComponent('country'),
      latitude: location.lat(),
      longitude: location.lng(),
    });
  };

  const handleSubmit = async () => {
  
    try {
      if (venue) {
        await updateVenue(venue.id, formData);
      } else {
        await createVenue(formData);
      }
  
      // Navigate to /venue-locations after success
      nav('/venue-locations');
    } catch (error) {
      console.error('Error submitting venue:', error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`Manage Venue | MobylMenu`}</title>
      </Helmet>
      <FormHeader
        buttonTitle={"Submit"}
        title={"Manage Venue"}
        onClick={handleSubmit}
        path={"/venue-locations"}
        disabled={!formIsValid}
      />
      <FormHeaderSpacer />
      <div className="division-container">
        <div id="form" className="left-divided-container" onSubmit={handleSubmit}>
          <div className="venue-info-fields">
            <div className={`field ${!venue?.tablesSubscription ? 'disabled-field' : ''}`}>
              <label htmlFor="ordering_enabled">Enable Ordering</label>
              <img
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Check this box to enable ordering from the table at this venue. Ensure all menu items have prices before enabling."
                className="question-mark-tooltip"
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
                alt="Info"
              />
              <input
                type="checkbox"
                id="ordering_enabled"
                name="ordering_enabled"
                disabled={!venue?.tablesSubscription}
                checked={formData.ordering_enabled}
                onChange={handleChange}
                className={!venue?.tablesSubscription ? 'disabled-checkbox' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="plant_based">Plant-Based</label>
              <img
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Check this box if your venue is 100% vegan, meaning no animal products are served."
                className="question-mark-tooltip"
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/question.png"
                alt="Info"
              />
              <input
                type="checkbox"
                id="plant_based"
                name="plant_based"
                checked={formData.plant_based}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="venue_name">Name of Venue</label>
            <input
              type="text"
              id="venue_name"
              name="venue_name"
              value={formData.venue_name}
              onChange={handleChange}
            />
            <span className="form-tip">Unless it's part of your actual name, avoid using the city/neighborhood in your name.</span>
          </div>

          <div className="form-group">
            <label htmlFor="order_link">Delivery Link</label>
            <input
              type="text"
              id="order_link"
              name="order_link"
              placeholder="Enter the full link url: https://www.ubereats.com/store..."
              value={formData.order_link}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reservation_link">Reservation Link</label>
            <input
              type="text"
              id="reservation_link"
              name="reservation_link"
              placeholder="Enter the full link url: https://www.opentable.com/r/..."
              value={formData.reservation_link}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="schedule">Schedule</label>
            <input
              type="text"
              id="schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="googleAddress">Address</label>
            <Autocomplete
              apiKey={GOOGLE_API_KEY}
              onPlaceSelected={handlePlaceSelected}
              options={{
                types: ['address'],
                componentRestrictions: { country: 'us' },
              }}
              placeholder="Start typing your address"
              style={{
                width: '400px',
                height: '30px'
              }}
            />
            <span className="form-tip">Enter your address here and we'll fill in the rest.</span>
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="+14045314638"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="right-divided-container">
          <h3 className="divided-container-header">Preview</h3>
        </div>
      </div>
    </div>
  );
};

export default ManageVenueScreen;
