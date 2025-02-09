import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Diary from './pages/Diary';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  );
};

export default AppRoutes; 