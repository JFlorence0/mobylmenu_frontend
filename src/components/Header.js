import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
    const { setIsLoggedIn, setUserData, setIsVenue } = useContext(AuthContext);
    const nav = useNavigate();

    const logout = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        setIsLoggedIn(false);
        setIsVenue(false);
        nav('/business');
      };
    return (
        <header className="header">
        <div className="header-content">
            <button onClick={logout} className="logout-button">
            Logout
            </button>
        </div>
        </header>
    );
};

export default Header;