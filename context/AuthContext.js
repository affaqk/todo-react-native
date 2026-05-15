import { createContext, useContext, useState, useEffect } from 'react';
import { authApi, clearCookie } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount — try to restore session from saved cookie
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const res = await authApi.me();
      setUser(res.data.user ?? res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    setUser(res.data.user ?? res.data);
    return res.data;
  };

  const signup = async (payload) => {
    const res = await authApi.signup(payload);
    return res.data; // usually goes to OTP verification next
  };

  const verifyOtp = async (payload) => {
    const res = await authApi.verifyOtp(payload);
    if (res.data.user) setUser(res.data.user); // auto-login after OTP (signup flow)
    return res.data;
  };

  const resendOtp = async (payload) => {
    const res = await authApi.resendOtp(payload);
    return res.data;
  };

  const forgotPassword = async (email) => {
    const res = await authApi.forgotPassword({ email });
    return res.data;
  };

  const resetPassword = async (payload) => {
    const res = await authApi.resetPassword(payload);
    return res.data;
  };

  const logout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    await clearCookie();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, verifyOtp, resendOtp, forgotPassword, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
