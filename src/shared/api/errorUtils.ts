import { ApiError } from './apiFetch';

// Type guard to check if an error is an ApiError
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

// Utility to extract status from error safely
export const getErrorStatus = (error: unknown): number | undefined => {
  return isApiError(error) ? error.status : undefined;
};

// Utility to check if error is client error (4xx)
export const isClientError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status !== undefined && status >= 400 && status < 500;
};

// Utility to check if error is server error (5xx)
export const isServerError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status !== undefined && status >= 500;
};
