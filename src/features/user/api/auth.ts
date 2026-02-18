import { useMutation, useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api/apiFetch';
import { queryClient } from '@/shared/api/queryClient';
import {
  setAuthTokens,
  getAccessToken,
  clearAuthTokens,
  updateAuthTokens,
} from '@/shared/lib/sessionHelper';

// Types
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
}

interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
  persist?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Types for dummyjson auth responses
interface LoginResponse extends AuthUser {}
interface LogoutResponse {
  message: string;
}
interface RefreshResponse extends AuthUser {}

// API Functions
const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { persist: _, ...loginData } = credentials;

  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

const logout = async (accessToken: string): Promise<LogoutResponse> => {
  const response = await apiFetch<LogoutResponse>('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Clear all cached queries on logout
  queryClient.clear();

  return response;
};

const refreshToken = async (
  refreshTokenValue: string
): Promise<RefreshResponse> => {
  return apiFetch<RefreshResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
      expiresInMins: 60,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getCurrentUser = async (accessToken: string): Promise<User> => {
  return apiFetch<User>('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Hooks
const useLogin = () => {
  return useMutation<AuthUser, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data, variables) => {
      // Store tokens using session helper
      setAuthTokens(
        data.accessToken,
        data.refreshToken,
        variables.persist ?? false
      );

      // Set user data in cache immediately
      queryClient.setQueryData(['currentUser'], {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      });
    },
  });
};

const useLogout = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No token found');
      }
      await logout(token);
    },
    onSuccess: () => {
      // Clear tokens using session helper
      clearAuthTokens();
    },
  });
};

const useCurrentUser = () => {
  const token = getAccessToken();

  return useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: () => {
      if (!token) {
        throw new Error('No token found');
      }
      return getCurrentUser(token);
    },
    enabled: !!token, // Only run query if token exists
    retry: false, // Don't retry auth errors
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

const useRefreshToken = () => {
  return useMutation<AuthUser, Error, string>({
    mutationFn: (refreshTokenValue: string) => refreshToken(refreshTokenValue),
    onSuccess: (data) => {
      // Update stored tokens using session helper
      updateAuthTokens(data.accessToken, data.refreshToken);
    },
  });
};

// Exports
export type { User, AuthUser, LoginCredentials, AuthState };
export { useLogin, useLogout, useCurrentUser, useRefreshToken };
