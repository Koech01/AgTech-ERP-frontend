import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';


interface AuthContextType {
  accessToken: string | null;
  role: string | null;
  setAccessToken: (token: string) => void;
  setRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));


  useEffect(() => {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (role) localStorage.setItem('role', role);
  }, [accessToken, role]);

  
  return (
    <AuthContext.Provider value={{ accessToken, role, setAccessToken, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);