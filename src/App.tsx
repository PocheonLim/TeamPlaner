import { BrowserRouter as Router } from 'react-router-dom';
import RootLayout from "./layouts/RootLayout";
import AppRoutes from "./AppRoutes";
import { GlobalStyle } from './styles/GlobalStyle';
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
  return (
    <Router>
      <SidebarProvider>
        <GlobalStyle />
        <RootLayout>
          <AppRoutes />
        </RootLayout>
      </SidebarProvider>
    </Router>
  );
}

export default App;
