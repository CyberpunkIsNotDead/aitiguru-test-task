import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '@/features/user/api/auth';
import Loader from '@/shared/ui/Loader';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();

  // Check if token exists first
  const hasToken = !!(
    localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token')
  );

  // Only fetch current user if token exists
  const { isLoading, error } = useCurrentUser();

  useEffect(() => {
    // If no token exists, redirect immediately
    if (!hasToken) {
      navigate('/auth', { replace: true });
      return;
    }

    // If there's an auth error, clear tokens and redirect
    if (!isLoading && error) {
      // Clear invalid tokens
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('refresh_token');

      navigate('/auth', { replace: true });
    }
  }, [hasToken, isLoading, error, navigate]);

  // If no token exists, show loading while redirecting
  if (!hasToken) {
    return <Loader />;
  }

  // Show loading state while checking auth
  if (isLoading) {
    return <Loader />;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;
