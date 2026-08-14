// js/config.js

// 1. Detect if running locally or in production
const isLocal = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1';

// 2. Define global environment configuration
window.APP_CONFIG = {
  API_BASE_URL: isLocal 
    ? 'http://localhost:3000/api/v1' 
    : 'https://notification.sp3digitalcom/api/v1',
  
  ENVIRONMENT: isLocal ? 'development' : 'production'
};