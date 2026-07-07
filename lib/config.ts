// lib/config.ts

/**
 * Global Configuration File
 * 
 * You can change these variables here to update the URLs across the entire application.
 * Alternatively, you can set the corresponding environment variables in your .env.local file.
 */

// 1. The base domain for the frontend application
// Change this when deploying to production (e.g., 'smartfolio.com')
// For local development, leave it as 'localhost:3000'
export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost:3000';

// 2. The protocol used for the frontend application ('http' or 'https')
// Use 'https' for production
export const APP_PROTOCOL = process.env.NEXT_PUBLIC_APP_PROTOCOL || 'http';

// 3. The base URL for the backend API
// Change this when deploying to production (e.g., 'https://api.smartfolio.com/api')
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get the full URL for a user's portfolio subdomain
export const getSubdomainUrl = (subdomain: string) => {
  // If the domain is localhost, it's typically http://subdomain.localhost:3000
  return `${APP_PROTOCOL}://${subdomain}.${APP_DOMAIN}`;
};

// Helper function to check if a hostname is the root domain or a subdomain
export const isLocalhost = (hostname: string) => {
  return hostname.includes('localhost');
};
