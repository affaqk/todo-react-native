import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COOKIE_KEY = 'fd_session_cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000', // ← fill your base URL here e.g. 'http://192.168.1.x:5000/api'
  timeout: 12000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach saved cookie on every request
api.interceptors.request.use(async (config) => {
  const cookie = await AsyncStorage.getItem(COOKIE_KEY);
  if (cookie) config.headers.Cookie = cookie;
  return config;
});

// Persist Set-Cookie from responses
api.interceptors.response.use(
  async (response) => {
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      const value = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
      await AsyncStorage.setItem(COOKIE_KEY, value);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export const clearCookie = () => AsyncStorage.removeItem(COOKIE_KEY);

// ─── Auth endpoints (fill URLs) ────────────────────────────────────────────
export const authApi = {
  login:         (data) => api.post('', data),           // POST /auth/login
  signup:        (data) => api.post('', data),           // POST /auth/register
  logout:        ()     => api.post(''),                 // POST /auth/logout
  me:            ()     => api.get(''),                  // GET  /auth/me
  forgotPassword:(data) => api.post('', data),           // POST /auth/forgot-password
  verifyOtp:     (data) => api.post('', data),           // POST /auth/verify-otp
  resendOtp:     (data) => api.post('', data),           // POST /auth/resend-otp
  resetPassword: (data) => api.post('', data),           // POST /auth/reset-password
};

// ─── Food endpoints (fill URLs) ────────────────────────────────────────────
export const foodApi = {
  getRestaurants: ()       => api.get(''),               // GET  /restaurants
  getRestaurant:  (id)     => api.get(`/${id}`),         // GET  /restaurants/:id
  placeOrder:     (data)   => api.post('', data),        // POST /orders
  getOrders:      ()       => api.get(''),               // GET  /orders/me
};

export default api;
