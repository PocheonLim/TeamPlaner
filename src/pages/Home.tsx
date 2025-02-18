import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { iconStyles } from '../styles/common';

interface MenuCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

const menuCards: MenuCard[] = [
  {
    title: '일정',
    description: '일정을 체계적으로 세워보세요',
    icon: '📅',
    path: '/schedule',
    color: '#4F46E5'
  },
  {
    title: '운동일지',
    description: '오늘의 운동을 기록하세요',
    icon: '📝',
    path: '/diary',
    color: '#10B981'
  },
  {
    title: '커뮤니티',
    description: '다른 학습자들과 소통해보세요',
    icon: '💬',
    path: '/community',
    color: '#EC4899'
  }
];

const HomeContainer = styled.div`
  padding: 32px;
  min-height: 100vh;
`;

const MenuGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MenuCardStyled = styled(motion.div)<{ $backgroundColor: string }>`
  background-color: ${props => props.$backgroundColor};
  padding: 24px;
  border-radius: 16px;
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 200px;
`;

const CardIcon = styled.span`
  ${iconStyles}
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 8px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <MenuGrid
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {menuCards.map((card, index) => (
          <MenuCardStyled
            key={card.title}
            $backgroundColor={card.color}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(card.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 } 
            }}
          >
            <CardIcon>{card.icon}</CardIcon>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </MenuCardStyled>
        ))}
      </MenuGrid>
    </HomeContainer>
  );
};

export default Home; 