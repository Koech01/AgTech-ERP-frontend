import type { AuthContextProp } from '../types';
import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext<AuthContextProp | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'farmer' | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedRole = localStorage.getItem('role') as 'admin' | 'farmer' | null;
    if (storedToken) setAccessToken(storedToken);
    if (storedRole) setRole(storedRole);

    console.log('Auth context state:', { accessToken, role });
  }, []);

  const logout = () => {
    setAccessToken(null);
    setRole(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ accessToken, role, setAccessToken, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};