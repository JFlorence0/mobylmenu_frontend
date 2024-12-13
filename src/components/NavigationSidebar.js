import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/baseStyles/NavSidebar.css';

const NavigationSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle the sidebar collapsed state
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sidebarOptions = [
        {
            img: 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/new-m-black.png',
            text: 'Manage Menus',
            link: '/manage-menus',
        },
        {
            img: 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/venue-black.png',
            text: 'My Venues',
            link: '/venue-locations',
        },
        {
            img: 'https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/atom.png',
            text: 'Pegasus',
            link: '/pegasus',
        },
        {
            img: 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/subscription-icon.png',
            text: 'Subscriptions',
            link: '/subscriptions',
        },
        {
            img: 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/settings-black.png',
            text: 'Settings',
            link: '/settings',
        },
    ];

    return (
        <div className={`sidebar-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
            <div className="sidebar">
                <div className="logo-container">
                    {isCollapsed ? (
                        <img
                            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/MM-M.png"
                            alt="Collapsed Logo"
                            className="sidebar-logo"
                        />
                    ) : (
                        <img
                            src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/mobylmenu-app.png"
                            alt="Expanded Logo"
                            className="sidebar-logo"
                        />
                    )}
                </div>

                <div className="sidebar-options">
                    {sidebarOptions.map((option, index) => (
                        <Link to={option.link} key={index} className="sidebar-option">
                            <img
                                src={option.img}
                                alt={option.text}
                                className="sidebar-option-img"
                            />
                            {!isCollapsed && <span className="sidebar-option-text">{option.text}</span>}
                        </Link>
                    ))}
                </div>
            </div>
            {/* Toggle button */}
            <div className="toggle-bar-container">
                <div className="toggle-bar" onClick={toggleSidebar}></div>
            </div>
        </div>
    );
};

export default NavigationSidebar;
