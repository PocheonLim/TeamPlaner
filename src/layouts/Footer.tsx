import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 24px;
  border-top: 1px solid #E5E7EB;
  margin-top: auto;  // 하단에 고정
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6B7280;
  font-size: 14px;
`;

const Copyright = styled.p`
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
  
  a {
    color: #6B7280;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #4B5563;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>&copy; 2025 My Website. All rights reserved.</Copyright>
        <FooterLinks>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 