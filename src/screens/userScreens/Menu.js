import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';

import '../../styles/menuStyles/Menu.css';
import { UserContext } from '../../contexts/UserContext';

import DesktopPageTop from '../../components/menuComponents/DesktopPageTop';
import MobilePageTop from '../../components/menuComponents/MobilePageTop';

const Menu = () => {
  const { venue_id } = useParams();
  const { getVenueById } = useContext(UserContext);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueById(venue_id);
        console.log(data);
        setVenue(data);

        // Always set default favicon
        const faviconUrl = '../../../public/assets/MobylMenuLogo.png'; // Default PNG file
        const favicon = document.getElementById('dynamic-favicon');
        if (favicon) {
          favicon.href = faviconUrl; // Update favicon
        } else {
          const newFavicon = document.createElement('link');
          newFavicon.id = 'dynamic-favicon';
          newFavicon.rel = 'icon';
          newFavicon.href = faviconUrl;
          document.head.appendChild(newFavicon);
        }
      } catch (error) {
        console.error('Error fetching venue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venue_id, getVenueById]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!venue) {
    return <p>Venue not found.</p>;
  }

  return (
    <div>
        <Helmet>
            <title>{`${venue.venue_name} Menu | MobylMenu`}</title>
            <meta property="og:title" content={`${venue.venue_name} Menu | MobylMenu`} />
            <meta property="og:description" content={`Explore the menu for ${venue.venue_name} on MobylMenu.`} />
            <meta 
            name="description" 
            content={`Explore the menu for ${venue.venue_name} on MobylMenu. Discover high-quality pictures and detailed descriptions of each dish to make your dining decision easier. Find out what’s on the menu at ${venue.venue_name} and enjoy a visual preview of your next meal.`} 
            />
            <meta 
            property="og:image" 
            content={venue?.logo_compressed || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'} 
            />
            <meta 
            name="keywords" 
            content={`${venue.venue_name} menu, ${venue.venue_name} restaurant menu, ${venue.venue_name} food pictures, ${venue.venue_name} dining, MobylMenu, restaurant menu with pictures`} 
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${venue.venue_name} Menu | MobylMenu`} />
            <meta name="twitter:description" content={`Explore the menu for ${venue.venue_name} on MobylMenu.`} />
            <meta 
            name="twitter:image" 
            content={venue?.logo_compressed || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'} 
            />
        </Helmet>
        {isMobile ? (
            <MobilePageTop venue={venue} />
        ) : (
            <DesktopPageTop venue={venue} />
        )}
      <Footer />
    </div>
  );
};

export default Menu;
