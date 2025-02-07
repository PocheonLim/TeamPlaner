import { BrowserRouter as Router } from 'react-router-dom';
import RootLayout from "./layouts/RootLayout";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <RootLayout>
        <AppRoutes />
      </RootLayout>
    </Router>
  );
}

export default App;
