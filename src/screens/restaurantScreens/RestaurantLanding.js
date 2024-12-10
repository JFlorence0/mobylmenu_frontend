import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

import '../../styles/restaurantStyles/RestaurantLandingStyles.css';

const RestaurantLanding = () => {
  const [slideshowImage, setSlideshowImage] = useState('');

  // Array of image sources
  const imageSources = [
    'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/landing5.webp',
    'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/landing2.webp',
  ];

  // Function to change the image source to a random choice
  const changeImageSource = () => {
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    setSlideshowImage(imageSources[randomIndex]);
  };

  useEffect(() => {
    changeImageSource(); // Change image when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="nr-main-container">
      <div className="nr-main-left">
        <div className="heading-container">
          <h1 className="heading">
            Attract,
            <br />
            Retain,
            <br />
            Grow.
          </h1>
          <a className="sign-up" href="auth/" style={{ color: 'white' }}>
            Sign Up
          </a>
        </div>

        <div className="bottom-container">
          <div className="bullet-point">
            <div className="bullet-container">
              <div className="bullet-header">
                <img
                  className="bullet-image"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/MM-plus.png"
                  alt="Sign Up Icon"
                />
              </div>
              <p>
                <span className="highlight">Sign up</span>
                <br /> to MobylMenu.
              </p>
            </div>
          </div>
          <div className="bullet-point">
            <div className="bullet-container">
              <div className="bullet-header">
                <img
                  className="bullet-up"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/MM-chevron-up.png"
                  alt="Incentivize Icon"
                />
              </div>
              <p>
                <span className="highlight">Incentivize</span>
                <br /> repeat visits.
              </p>
            </div>
          </div>
          <div className="bullet-point">
            <div className="bullet-container">
              <div className="bullet-header">
                <img
                  className="bullet-image"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/arrow-right.png"
                  alt="Expand Icon"
                />
              </div>
              <p>
                <span className="highlight">Expand</span>
                <br /> customer base.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="nr-main-right">
        <img id="slideshow-image" src={slideshowImage} alt="Slideshow" />
      </div>

      {/* Secondary Section */}
      <h2 className="heading-4" id="white">
        WHAT YOU'LL GET
      </h2>
      <div className="main-container-2">
        <div className="sub-container">
          <h3 className="sub-heading">Create a Free, Picture-Filled Menu</h3>
          <div className="phone-container">
            <img
              className="phone-image"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/phone-left.webp"
              alt="Phone Image Left"
            />
          </div>
          <p className="sub-paragraph">
            Build your <span className="highlight">free digital menu</span> easily with MobylMenu.
            Showcase each of your menu items with pictures, prices, descriptions, and emojis
            indicating if dishes are vegan, vegetarian, gluten-free, or spicy. Your menu will be
            accessible via <span className="highlight">QR codes</span> placed on your tables,
            allowing customers to browse and order conveniently from their smartphones.
          </p>
        </div>

        <div className="sub-container">
          <h3 className="sub-heading">A New Way To Be Discovered</h3>
          <div className="phone-container">
            <img
              id="phone-middle"
              className="phone-image"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/phone-right.webp"
              alt="Phone Image Middle"
            />
          </div>
          <p className="sub-paragraph">
            Each of your venues will be listed on the <span className="highlight">MobylMenu App</span>,
            which will be accessible to each of our users, who primarily use{' '}
            <span className="highlight">MobylMenu</span> to find new places to eat. Your picture
            friendly menu makes it easy for them to decide where they want to go.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantLanding;
