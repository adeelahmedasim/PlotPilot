import React from 'react';
import logoImage from '../assets/Logo.png';

const Logo: React.FC = () => {
  return (
    <img src={logoImage} alt="logo"  width="24px" height="24px"/>
  );
};

export default Logo;