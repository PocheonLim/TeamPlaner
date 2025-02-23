import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Diary from './pages/Diary';
import Auth from './pages/Auth';
import { useAuth } from './contexts/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/diary" element={<Diary />} />
      </Route>

      {/* 알 수 없는 경로는 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 