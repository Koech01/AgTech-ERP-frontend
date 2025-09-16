import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  accessToken: string | null;
  role: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 


  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/refresh/', {
          method: 'POST',
          credentials: 'include',  
        });

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken || null);
          setRole(data.role || null);
        } else {
          setAccessToken(null);
          setRole(null);
        }
      } catch {
        setAccessToken(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, []);



  const logout = async () => {
    await fetch('http://127.0.0.1:8000/api/v1/logout/', {
      method: 'POST',
      credentials: 'include',
    });
    setAccessToken(null);
    setRole(null);
  };



  if (loading) return <div />; 


  return (
    <AuthContext.Provider value={{ accessToken, role, setAccessToken, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};