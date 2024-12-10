import React from 'react';
import '../../styles/baseStyles/Auth.css';

const AuthButton = ({ title, onPress }) => {
  return (
        <a onClick={onPress} className='authButton'>
            {title}
        </a>
  );
};

export default AuthButton;