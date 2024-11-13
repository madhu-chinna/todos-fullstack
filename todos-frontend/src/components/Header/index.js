import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For managing cookies

import './index.css'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from cookies
    Cookies.remove('token');

    // Navigate to the Signup page
    navigate('/signup');
  };

  return (
    <header className="header">
      <h1 className="header-title">Todo Web Application</h1>
      <div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
    </header>
  );
};

export default Header;
