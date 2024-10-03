import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate
  const location = useLocation(); // useLocation hook to get current URL path

  const handleLogout = () => {
    // Show a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.removeItem('token'); // Clear the token
      navigate('/'); // Navigate to the home or login page
    }
  };

  return (
    <div>
      <div className='header'>
        <div>
          <img className='netflix_logo' src="./Netflix_Logo.png" alt="logo" />
        </div>
        <div style={{ padding: '20px' }}>
          {/* Conditionally render the "Sign out" button based on the current path */}
          {location.pathname !== '/' && (
            <button onClick={handleLogout}>Sign out</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;