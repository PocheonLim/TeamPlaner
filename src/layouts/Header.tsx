import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E5E7EB;
  border-radius: 16px 16px 0 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeMessage = styled.div`
  h1 {
    font-size: 24px;
    color: #111827;
    margin: 0;
  }
  p {
    color: #6B7280;
    margin: 4px 0 0 0;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const Icon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <WelcomeMessage>
          <h1>사용자님 안녕하세요</h1>
          <p>체계적인 계획을 세우고 이루세요</p>
        </WelcomeMessage>
        <HeaderActions>
          <ActionButton>
            <Icon>⚙️</Icon>
          </ActionButton>
          <ActionButton>
            <Icon>👤</Icon>
          </ActionButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 