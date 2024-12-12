import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';

import '../../styles/userStyles/menuStyles/Menu.css';
import { UserContext } from '../../contexts/UserContext';

import PageTop from '../../components/menuComponents/PageTop';
import MenuItemSection from '../../components/menuComponents/MenuItemSection';
import CarouselContainer from '../../components/menuComponents/CarouselContainer';

const Menu = () => {
  const { venue_id, table_id } = useParams();
  const { getVenueById, getMenuItems } = useContext(UserContext);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [orderingEnabled, setOrderingEnabled] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const addItemToOrder = () => {
    console.log('Item added');
  }

  const addItemToOrderWithTableId = () => {
    console.log('Item added with tableId');
  }

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueById(venue_id);

        setVenue(data);
        setCategories(data.menu.categories);
        setOrderingEnabled(data.ordering_enabled);
        setSelectedMenu(data.menu);

        const fetchedMenuItems = await getMenuItems(data);
        setMenuItems(fetchedMenuItems)

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

  // Move Left Logic
  const moveLeft = (categoryName) => {
    const carouselContent = document.getElementById(`carousel-${categoryName}`);
    const currentIndex = parseInt(carouselContent.dataset.currentIndex, 10);
    const newIndex = Math.max(0, currentIndex - 1); // Prevent moving beyond the first item
    carouselContent.dataset.currentIndex = newIndex;

    // Update the active dot index
    setActiveDotIndex(newIndex);

    // Scroll carousel content to the new position
    const itemWidth = carouselContent.children[0]?.offsetWidth || 0;
    carouselContent.scrollTo({
      left: itemWidth * newIndex,
      behavior: 'smooth',
    });
  };

  // Move Right Logic
  const moveRight = (categoryName) => {
    const carouselContent = document.getElementById(`carousel-${categoryName}`);
    const currentIndex = parseInt(carouselContent.dataset.currentIndex, 10);
    const newIndex = Math.min(
      currentIndex + 1,
      carouselContent.children.length - 1 // Prevent moving beyond the last item
    );
    carouselContent.dataset.currentIndex = newIndex;

    // Update the active dot index
    setActiveDotIndex(newIndex);

    // Scroll carousel content to the new position
    const itemWidth = carouselContent.children[0]?.offsetWidth || 0;
    carouselContent.scrollTo({
      left: itemWidth * newIndex,
      behavior: 'smooth',
    });
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!venue) {
    return <p>Venue not found.</p>;
  }

  return (
    <div className='main-container'>
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
        <PageTop venue={venue} categories={categories} selectedMenu={selectedMenu} 
          setSelectedMenu={setSelectedMenu} />
        <MenuItemSection categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <CarouselContainer selectedCategory={selectedCategory} categories={categories} menuItems={menuItems}  
          venue={venue} moveLeft={moveLeft} moveRight={moveRight} orderingEnabled={orderingEnabled}
          activeDotIndex={activeDotIndex} tableId={table_id} addItemToOrder={addItemToOrder} 
          addItemToOrderWithTableId={addItemToOrderWithTableId}
        />
    </div>
  );
};

export default Menu;
