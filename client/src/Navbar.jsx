import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  // Don't show navbar on login page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h3 style={{ color: 'white', margin: 0 }}>Self-Healing Network</h3>
        {isAuthenticated && (
          <>
            <Link 
              to="/dashboard" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: location.pathname === '/dashboard' ? '#34495e' : 'transparent'
              }}
            >
              Dashboard
            </Link>
            <Link 
              to="/prediction" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: location.pathname === '/prediction' ? '#34495e' : 'transparent'
              }}
            >
              Prediction
            </Link>
            <Link 
              to="/history" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: location.pathname === '/history' ? '#34495e' : 'transparent'
              }}
            >
              History
            </Link>
          </>
        )}
      </div>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
