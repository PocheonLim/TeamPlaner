import { ReactNode } from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/layout/layout.css";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
      <div className="root-layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </div>
    );
  };
  

export default RootLayout; 