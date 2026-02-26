import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple wrapper that redirects to sign-in if the stored role doesn't match
const RequireRole = ({ role, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('role');
    if (stored !== role) {
      // not authorized
      navigate('/pages/signin');
    }
  }, [role, navigate]);

  return <>{children}</>;
};

export default RequireRole;
