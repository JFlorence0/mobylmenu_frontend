import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/restaurantStyles/FormStyles.css'
import FormButton from './buttons/FormButton';

const FormHeader = ({ buttonTitle, title, onClick, path, disabled }) => {
    const nav = useNavigate();

    const handleNavigation = () => {
        nav(path);
    };

    return (
        <div className="form-header-container">
            <div
                className="navigation-logo-container"
                onClick={handleNavigation} // Call the navigation handler
                style={{ cursor: "pointer" }} // Make it clickable
            >
                <span className="form-header-text" style={{ marginLeft: "10px" }}>{title}</span>
            </div>
            <FormButton onClick={onClick} title={buttonTitle} disabled={disabled} />
        </div>
    );
};

export default FormHeader;

