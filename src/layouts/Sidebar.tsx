import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.png";

const SidebarContainer = styled.aside`
  width: 210px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  padding: 10px 16px;
  height: calc(100vh - 32px);  // 상하 여백 16px씩
  margin: 16px 0;  // 상하 여백
  border-radius: 16px;  // 모서리 둥글게
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);  // 미세한 그림자
  left: 16px;  // 왼쪽 여백
`;

const LogoContainer = styled.div`
  padding: 12px 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;  // 왼쪽 정렬로 변경
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Logo = styled.img`
  height: 50%;
  width: 50%;
  margin-left: 40px;  // 왼쪽 여백을 추가하여 오른쪽으로 이동
`;

const Nav = styled.nav`
  padding: 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  list-style: none;
  margin-bottom: 8px;

  a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    text-decoration: none;
    color: #6b7280;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f3f4f6;
      color: #4b5563;
    }
  }
`;

const Icon = styled.span`
  margin-right: 12px;
  font-size: 20px;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Link to="/">
          <Logo src={logo} alt="Reflog" />
        </Link>
      </LogoContainer>
      
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/">
              <Icon>🏠</Icon>
              <Text>홈</Text>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/schedule">
              <Icon>📅</Icon>
              <Text>일정</Text>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/diary">
              <Icon>📝</Icon>
              <Text>운동일지</Text>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/community">
              <Icon>💬</Icon>
              <Text>커뮤니티</Text>
            </Link>
          </NavItem>
        </NavList>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar; 