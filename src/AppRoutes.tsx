import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Feature1 from "./pages/Feature1";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature1" element={<Feature1 />} />
    </Routes>
  );
};

export default AppRoutes; 