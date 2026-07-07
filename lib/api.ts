import { API_BASE_URL } from './config';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Merge default headers with provided options
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // If we are sending FormData (like a file upload), we MUST delete the Content-Type header
  // so the browser can automatically set it to multipart/form-data with the correct boundary.
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
    // Important for cross-origin cookies
    credentials: 'include' as RequestCredentials,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};
