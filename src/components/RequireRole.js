import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple wrapper that redirects to sign-in if the stored role doesn't match
// `role` can be a string or an array of allowed roles
const RequireRole = ({ role, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('role');
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(stored)) {
      // not authorized
      navigate('/pages/signin');
    }
  }, [role, navigate]);

  return <>{children}</>;
};

export default RequireRole;
