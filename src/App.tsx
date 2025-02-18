import { BrowserRouter as Router } from 'react-router-dom';
import RootLayout from "./layouts/RootLayout";
import AppRoutes from "./AppRoutes";
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <RootLayout>
        <AppRoutes />
      </RootLayout>
    </Router>
  );
}

export default App;
