import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.png";
import { useSidebar } from '../contexts/SidebarContext';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: ${props => props.$isOpen ? '210px' : '70px'};
  background-color: white;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  padding: 10px ${props => props.$isOpen ? '16px' : '8px'};
  height: calc(100vh - 32px);
  margin: 16px 0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  left: 16px;
  transition: all 0.3s ease;
`;

const LogoContainer = styled.div<{ $isOpen: boolean }>`
  padding: 12px 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isOpen ? 'flex-start' : 'center'};
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Logo = styled.img<{ $isOpen: boolean }>`
  height: 50%;
  width: ${props => props.$isOpen ? '50%' : '80%'};
  margin-left: ${props => props.$isOpen ? '40px' : '0'};
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  padding: 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li<{ $isOpen: boolean }>`
  list-style: none;
  margin-bottom: 8px;

  a {
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px ${props => props.$isOpen ? '16px' : '8px'};
    text-decoration: none;
    color: #6b7280;
    border-radius: 8px;
    transition: all 0.2s ease;
    justify-content: ${props => props.$isOpen ? 'flex-start' : 'center'};

    &:hover {
      background-color: #f3f4f6;
      color: #4b5563;
    }
  }
`;

const Icon = styled.span<{ $isOpen: boolean }>`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

const Text = styled.span<{ $isOpen: boolean }>`
  position: absolute;
  left: 48px;
  font-size: 14px;
  font-weight: 500;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: -12px;
  top: 24px;
  width: 24px;
  height: 24px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <SidebarContainer $isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </ToggleButton>
      <LogoContainer $isOpen={isOpen}>
        <Link to="/">
          <Logo src={logo} alt="Reflog" $isOpen={isOpen} />
        </Link>
      </LogoContainer>
      
      <Nav>
        <NavList>
          <NavItem $isOpen={isOpen}>
            <Link to="/">
              <Icon $isOpen={isOpen}>🏠</Icon>
              <Text $isOpen={isOpen}>홈</Text>
            </Link>
          </NavItem>
          <NavItem $isOpen={isOpen}>
            <Link to="/schedule">
              <Icon $isOpen={isOpen}>📅</Icon>
              <Text $isOpen={isOpen}>일정</Text>
            </Link>
          </NavItem>
          <NavItem $isOpen={isOpen}>
            <Link to="/diary">
              <Icon $isOpen={isOpen}>📝</Icon>
              <Text $isOpen={isOpen}>운동일지</Text>
            </Link>
          </NavItem>
          <NavItem $isOpen={isOpen}>
            <Link to="/community">
              <Icon $isOpen={isOpen}>💬</Icon>
              <Text $isOpen={isOpen}>커뮤니티</Text>
            </Link>
          </NavItem>
        </NavList>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;