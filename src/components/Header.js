import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/baseStyles/NavHeader.css';
import Image from './Image';

const Header = ({ path = [] }) => {
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
        <div className="navigation-container">
            <div className="navigation-header-container">
                <a className="navigation-logo-container" href="/dashboard">
                    <Image
                        src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/MM-M.png"
                        alt="MobylMenu Logo"
                        className="navigation-m-logo"
                    />
                    <span className="logo-text">OBYLMENU</span>
                </a>
                <a onClick={logout} className="logout-button">
                    Logout
                </a>
            </div>
            <div className="breadcrumb-container">
                {/* Dashboard is always present */}
                <Link
                    to="/dashboard"
                    className={`breadcrumb-link ${path.length === 0 ? 'active-breadcrumb' : ''}`}
                >
                    Dashboard
                </Link>
                {/* Render breadcrumbs based on the provided path */}
                {path.map((breadcrumb, index) => (
                    <div key={index} className="breadcrumb">
                        <Image
                            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-forward.png"
                            className="breadcrumb-separator"
                            alt="Chevron Forward"
                        />
                        <Link
                            to={breadcrumb.link}
                            className={`breadcrumb-link ${
                                index === path.length - 1 ? 'active-breadcrumb' : ''
                            }`}
                        >
                            {breadcrumb.label}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
