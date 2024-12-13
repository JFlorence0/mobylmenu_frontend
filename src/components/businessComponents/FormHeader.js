import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../Image';
import FormButton from './buttons/FormButton';

const FormHeader = ({ buttonTitle, title, onClick, disabled }) => {
    const nav = useNavigate();

    return (
        <div className="navigation-container">
            <div className="navigation-header-container">
                <a className="navigation-logo-container" href="/venue-locations">
                    <span className="logo-text" style={{ marginLeft: "10px" }}>{title}</span>
                </a>
                <FormButton onClick={onClick} title={buttonTitle} disabled={disabled} />
            </div>
        </div>
    );
};

export default FormHeader;
