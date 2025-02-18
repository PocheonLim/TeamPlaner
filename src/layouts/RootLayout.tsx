import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface RootLayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 236px;
  min-height: 100vh;
  margin-top: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  padding: 24px;
  flex: 1;
  background-color: white;
  border-top: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
`;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </MainContent>
    </LayoutContainer>
  );
};

export default RootLayout; 