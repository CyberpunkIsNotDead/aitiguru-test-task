// Session storage helper functions for authentication tokens

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

/**
 * Get the appropriate storage object based on persist option
 */
const getStorage = (persist: boolean): Storage => {
  return persist ? localStorage : sessionStorage;
};

/**
 * Store authentication tokens
 */
export const setAuthTokens = (
  accessToken: string,
  refreshToken: string,
  persist: boolean
): void => {
  const storage = getStorage(persist);
  storage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  storage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
};

/**
 * Get access token from storage (checks both localStorage and sessionStorage)
 */
export const getAccessToken = (): string | null => {
  return (
    localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN) ??
    sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
  );
};

/**
 * Get refresh token from storage (checks both localStorage and sessionStorage)
 */
export const getRefreshToken = (): string | null => {
  return (
    localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN) ??
    sessionStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
  );
};

/**
 * Check if any authentication token exists
 */
export const hasAuthToken = (): boolean => {
  return !!(getAccessToken() ?? getRefreshToken());
};

/**
 * Clear all authentication tokens from both storages
 */
export const clearAuthTokens = (): void => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
};

/**
 * Update tokens (typically used after token refresh)
 */
export const updateAuthTokens = (
  accessToken: string,
  refreshToken: string
): void => {
  // Update in both storages to ensure consistency
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
  sessionStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  sessionStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
};

// Sort state management
const SORT_KEYS = {
  SORT_BY: 'products_sort_by',
  SORT_ORDER: 'products_sort_order',
} as const;

/**
 * Save sort state to localStorage
 */
export const saveSortState = (sortBy: string, order: 'asc' | 'desc'): void => {
  localStorage.setItem(SORT_KEYS.SORT_BY, sortBy);
  localStorage.setItem(SORT_KEYS.SORT_ORDER, order);
};

/**
 * Get sort state from localStorage
 */
export const getSortState = (): { sortBy: string; order: 'asc' | 'desc' } => {
  const sortBy = localStorage.getItem(SORT_KEYS.SORT_BY) ?? 'title';
  const sortOrder = localStorage.getItem(SORT_KEYS.SORT_ORDER);

  // Type guard to ensure sortOrder is valid
  const order: 'asc' | 'desc' =
    sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';

  return { sortBy, order };
};

/**
 * Clear sort state from localStorage
 */
export const clearSortState = (): void => {
  localStorage.removeItem(SORT_KEYS.SORT_BY);
  localStorage.removeItem(SORT_KEYS.SORT_ORDER);
};
