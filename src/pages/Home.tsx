import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import schedulePreview from '../assets/schedule-preview.png';
import workoutRecordPreview from '../assets/workout-record-preview.png';
import workoutGraphPreview from '../assets/workout-graph-preview.png';

interface MenuCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  backgroundColor: string;
}

const menuCards: MenuCard[] = [
  {
    title: '일정',
    description: '일정을 체계적으로 세워보세요',
    icon: '📅',
    path: '/schedule',
    color: '#4F46E5',
    backgroundColor: '#4F46E5'
  },
  {
    title: '운동일지',
    description: '오늘의 운동을 기록하세요',
    icon: '📝',
    path: '/diary',
    color: '#10B981',
    backgroundColor: '#10B981'
  },
  {
    title: '커뮤니티',
    description: '다른 학습자들과 소통해보세요',
    icon: '💬',
    path: '/community',
    color: '#EC4899',
    backgroundColor: '#EC4899'
  }
];

const HomeContainer = styled.div`
  padding: 0;
  overflow-x: hidden;
`;

const Hero = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #4F46E5 0%, #10B981 100%);
  color: white;
  padding: 0 24px;
  border-radius: 2rem;
  margin: 2rem;

  h1 {
    font-size: 48px;
    margin-bottom: 24px;
  }

  p {
    font-size: 20px;
    max-width: 600px;
    line-height: 1.6;
  }
`;

const Section = styled.section`
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 80px 24px;
  
  &:nth-child(even) {
    background-color: #f8fafc;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 64px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;

  h2 {
    font-size: 36px;
    margin-bottom: 24px;
    color: #1F2937;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    color: #4B5563;
  }
`;

const ImageContent = styled.div`
  flex: 1;
  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureCards = styled.section`
  padding: 80px 24px;
  background-color: white;

  h2 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 48px;
    color: #1F2937;
  }
`;

const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled(motion.div)<{ $backgroundColor?: string }>`
  background: ${props => props.$backgroundColor || 'white'};
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  
  .icon {
    font-size: 32px;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    color: white;
  }

  .description {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
  }
  
  &:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Hero>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          당신의 건강한 라이프스타일을 위한 동반자
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          운동과 일정 관리를 통해 더 나은 삶을 만들어보세요
        </motion.p>
      </Hero>

      <Section>
        <Content>
          <TextContent>
            <h2>체계적인 일정 관리</h2>
            <p>
              직관적인 캘린더 인터페이스로 일정을 쉽게 관리하고,
              할 일 목록을 효율적으로 정리하세요.
              우선순위에 따라 작업을 구성하고, 마감일을 놓치지 않도록 도와드립니다.
            </p>
          </TextContent>
          <ImageContent>
            <img src={schedulePreview} alt="일정 관리 미리보기" />
          </ImageContent>
        </Content>
      </Section>

      <Section>
        <Content>
          <ImageContent>
            <img src={workoutRecordPreview} alt="운동 기록 미리보기" />
          </ImageContent>
          <TextContent>
            <h2>상세한 운동 기록</h2>
            <p>
              운동 종류, 세트, 반복 횟수, 무게를 손쉽게 기록하세요.
              메모 기능으로 특이사항이나 컨디션도 함께 기록할 수 있습니다.
              날짜별로 기록을 관리하고 과거 기록을 쉽게 찾아볼 수 있습니다.
            </p>
          </TextContent>
        </Content>
      </Section>

      <Section>
        <Content>
          <TextContent>
            <h2>데이터 기반 운동 분석</h2>
            <p>
              기록된 운동 데이터를 바탕으로 볼륨과 강도의 변화를 
              한눈에 파악할 수 있는 그래프를 제공합니다.
              운동별 진척도를 확인하고 더 나은 목표 설정에 활용하세요.
              당신의 성장이 그래프로 시각화됩니다.
            </p>
          </TextContent>
          <ImageContent>
            <img src={workoutGraphPreview} alt="운동 그래프 미리보기" />
          </ImageContent>
        </Content>
      </Section>

      <FeatureCards>
        <h2>지금 바로 시작하세요</h2>
        <CardGrid>
          {menuCards.map((card, index) => (
            <Card
              key={card.title}
              onClick={() => navigate(card.path)}
              $backgroundColor={card.backgroundColor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 } 
              }}
            >
              <span className="icon">{card.icon}</span>
              <div className="title">{card.title}</div>
              <div className="description">{card.description}</div>
            </Card>
          ))}
        </CardGrid>
      </FeatureCards>
    </HomeContainer>
  );
};

export default Home; 