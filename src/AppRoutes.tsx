import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Schedule from './pages/Schedule';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
};

export default AppRoutes; 