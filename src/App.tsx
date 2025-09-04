import type { JSX } from 'react';
import Crops from './components/Crops';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Farmers from './components/Farmers';
import UserProfile from './components/User';
import NotFound from './components/NotFound';
import AdminLayout from './components/Home/AdminLayout';
import { useAuth } from './components/Auth/authContext';
import FarmerLayout from './components/Home/FarmerLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/Home/AdminDashboard';
import FarmerDashboard from './components/Home/FarmerDashboard';


const PrivateRoute = ({ children, allowedRole, }: {
  children: JSX.Element;
  allowedRole?: string;
}) => {

  const { accessToken, role } = useAuth();
  if (!accessToken) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) {
    return role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />;
  }
  return children;
  
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Farmer routes */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRole="farmer">
              <FarmerLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<FarmerDashboard />} />
          <Route path="crops" element={<Crops />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="crops" element={<Crops />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;