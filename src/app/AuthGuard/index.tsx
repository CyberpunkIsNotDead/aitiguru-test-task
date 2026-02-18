import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '@/features/user/api/auth';
import { hasAuthToken, clearAuthTokens } from '@/shared/lib/sessionHelper';
import Loader from '@/shared/ui/Loader';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();

  // Check if token exists first
  const hasToken = hasAuthToken();

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
      // Clear invalid tokens using session helper
      clearAuthTokens();

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
