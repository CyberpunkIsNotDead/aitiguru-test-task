import { API_BASE_URL } from './config';

export interface ApiFetchOptions {
  method?: string;
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
  timeout?: number;
  abortController?: AbortController;
  headers?: Record<string, string>;
  // Explicitly forbid 'data' property to catch common mistakes
  data?: never;
}

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status?: number;
}

class ApiError extends Error {
  public readonly status?: number;
  public readonly response?: Response;

  constructor(message: string, status?: number, response?: Response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Enhanced fetch wrapper with timeout and abort support
 */
const apiFetch = async <T = unknown>(
  url: string,
  options: ApiFetchOptions = {}
): Promise<T> => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const {
    timeout = DEFAULT_TIMEOUT,
    abortController,
    headers = {},
    ...fetchOptions
  } = options;

  // Create abort controller if not provided
  const controller = abortController ?? new AbortController();
  const signal = controller.signal;

  // Set default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Create timeout promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new ApiError(`Request timeout after ${timeout}ms`));
    }, timeout);

    // Cleanup timeout on abort
    signal.addEventListener('abort', () => {
      clearTimeout(timeoutId);
    });
  });

  try {
    const response = await Promise.race([
      fetch(fullUrl, {
        ...fetchOptions,
        headers: defaultHeaders,
        signal,
      }),
      timeoutPromise,
    ]);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new ApiError(
        `HTTP ${response.status}: ${errorText}`,
        response.status,
        response
      );
    }

    // Handle different content types
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    } else {
      return (await response.text()) as T;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request was aborted');
      }
      throw new ApiError(error.message);
    }

    throw new ApiError('Unknown error occurred');
  }
};

/**
 * Create a new abort controller for manual request cancellation
 */
const createAbortController = (): AbortController => {
  return new AbortController();
};

/**
 * TanStack Query compatible fetcher function
 */
const queryFetcher = async <T = unknown>({
  queryKey,
  meta,
}: {
  queryKey: [string, ...unknown[]];
  meta?: { abortController?: AbortController };
}): Promise<T> => {
  const [url] = queryKey;
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  return apiFetch<T>(fullUrl, {
    abortController: meta?.abortController,
  });
};

/**
 * TanStack Query compatible mutation function
 */
const mutationFetcher = async <T = unknown, V = unknown>({
  url,
  method = 'POST',
  body,
  options = {},
}: {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: V;
  options?: ApiFetchOptions;
}): Promise<T> => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  return apiFetch<T>(fullUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
};

/**
 * Utility to create a cancellable request
 */
const createCancellableRequest = <T = unknown>(
  url: string,
  options: ApiFetchOptions = {}
) => {
  const controller = createAbortController();
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const request = apiFetch<T>(fullUrl, {
    ...options,
    abortController: controller,
  });

  return {
    request,
    cancel: () => controller.abort(),
    controller,
  };
};

// Export all functions and types
export {
  apiFetch,
  createAbortController,
  queryFetcher,
  mutationFetcher,
  createCancellableRequest,
  ApiError,
  type ApiResponse,
};
