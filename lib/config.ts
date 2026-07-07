// lib/config.ts

/**
 * Global Configuration File
 * 
 * You can change these variables here to update the URLs across the entire application.
 * Alternatively, you can set the corresponding environment variables in your .env.local file.
 */

// Check if the app is running in production
const isProd = process.env.NODE_ENV === 'production';

// 1. The base URL for the frontend application
// You can use a normal full link here (e.g. https://smartfolio-ten.vercel.app)
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || (isProd ? 'https://smartfolio-ten.vercel.app' : 'http://localhost:3000');

// Derived domain for middleware routing
export const APP_DOMAIN = (() => {
  try {
    return new URL(FRONTEND_URL).host;
  } catch (e) {
    return isProd ? 'smartfolio-ten.vercel.app' : 'localhost:3000';
  }
})();

// Derived protocol for UI components
export const APP_PROTOCOL = (() => {
  try {
    return new URL(FRONTEND_URL).protocol.replace(':', '');
  } catch (e) {
    return isProd ? 'https' : 'http';
  }
})();

// 2. The remote backend URL
// This is the ONLY place you need to change the backend server link in the codebase.
export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://smart-folio-backend.vercel.app';

// 3. The base URL for the backend API
// During local development, we use '/api' to proxy through Next.js (client-side) to avoid CORS/Cookie issues.
// Server-side requests need an absolute URL.
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? (typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api')
  : `${BACKEND_URL}/api`;

// Helper function to get the full URL for a user's portfolio subdomain
export const getSubdomainUrl = (subdomain: string) => {
  try {
    const url = new URL(FRONTEND_URL);
    return `${url.protocol}//${subdomain}.${url.host}`;
  } catch (e) {
    // Fallback if URL parsing fails
    return `http://${subdomain}.localhost:3000`;
  }
};

// Helper function to check if a hostname is the root domain or a subdomain
export const isLocalhost = (hostname: string) => {
  return hostname.includes('localhost');
};
