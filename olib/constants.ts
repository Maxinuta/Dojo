// services/api/constants.ts

export const API_BASE_URL = typeof window === 'undefined' 
  ? (process.env.HODINOVYROZVOZ_SERVER_API || 'http://backend:5000')
  : '/api';
  
export const PAGE_PUBLIC_URL = process.env.NEXT_HODINOVYROZVOZ_API_URL || 'http://tests.themissingsolutions.com/api'
export const API_CACHE_TIME = 60 * 60; // 1 hodina 
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB