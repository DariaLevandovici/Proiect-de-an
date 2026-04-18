// Base URL for the ASP.NET Core backend API
// Backend runs on http://localhost:5224
export const API_BASE_URL = 'http://localhost:5224';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/api/Products`,
} as const;
