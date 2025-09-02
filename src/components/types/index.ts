
export interface AuthContextProp {
  accessToken: string | null;
  role: 'admin' | 'farmer' | null;
  setAccessToken: (token: string | null) => void;
  setRole: (role: 'admin' | 'farmer' | null) => void;
  logout: () => void;
} 