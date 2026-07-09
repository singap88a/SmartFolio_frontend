// =========================================================================
// 🌟 إعدادات المشروع (غير الروابط من هنا فقط) 🌟
// =========================================================================

// 1. رابط الفرونت إند (الموقع نفسه)
const FRONTEND_URL_LOCAL = 'http://localhost:3000';
const FRONTEND_URL_PROD = 'https://smartfolio-ten.vercel.app';

// 2. رابط الباك إند (السيرفر)
const BACKEND_URL_LOCAL = 'http://localhost:5000'; 
const BACKEND_URL_PROD = 'https://smart-folio-backend.vercel.app';

// 3. وضع التشغيل (التحكم اليدوي)
// لو عايز تجبر المشروع يشتغل بروابط الـ Production وأنت على جهازك (Localhost)، غير دي لـ true
const FORCE_PRODUCTION = false; 

// =========================================================================
// ⚙️ أكواد التشغيل (لا تقم بتعديل هذا الجزء) ⚙️
// =========================================================================

const isProd = FORCE_PRODUCTION || process.env.NODE_ENV === 'production';

export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || (isProd ? FRONTEND_URL_PROD : FRONTEND_URL_LOCAL);
export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || (isProd ? BACKEND_URL_PROD : BACKEND_URL_LOCAL);

export const APP_DOMAIN = (() => {
  try { return new URL(FRONTEND_URL).host; } 
  catch (e) { return isProd ? FRONTEND_URL_PROD.replace('https://', '') : 'localhost:3000'; }
})();

export const APP_PROTOCOL = (() => {
  try { return new URL(FRONTEND_URL).protocol.replace(':', ''); } 
  catch (e) { return isProd ? 'https' : 'http'; }
})();

// During local development, proxy through Next.js
export const API_BASE_URL = process.env.NODE_ENV === 'development' && !FORCE_PRODUCTION
  ? (typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api')
  : `${BACKEND_URL}/api`;

// URL Generator
export const getSubdomainUrl = (subdomain: string) => {
  try {
    const url = new URL(FRONTEND_URL);
    if (url.host.includes('.vercel.app')) {
      return `${url.protocol}//${url.host}/${subdomain}`;
    }
    return `${url.protocol}//${subdomain}.${url.host}`;
  } catch (e) {
    return `http://${subdomain}.localhost:3000`;
  }
};

export const isLocalhost = (hostname: string) => {
  return hostname.includes('localhost');
};
