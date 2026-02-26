import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem('currentUser');
  const user = stored ? JSON.parse(stored) : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.brand}>E'xse</div>
      {user && (
        <div style={styles.info}>
          <span style={styles.name}>Hi, {user.username}</span>
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#5e5dc7',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  brand: {
    fontSize: '20px',
    fontWeight: '700'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  name: {
    fontSize: '16px'
  },
  logout: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Header;
