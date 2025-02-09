import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

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
    path: '/review',
    color: '#10B981'
  },
  {
    title: '분석리포트',
    description: '학습 현황을 분석해보세요',
    icon: '📊',
    path: '/analytics',
    color: '#F59E0B'
  },
  {
    title: '커뮤니티',
    description: '다른 학습자들과 소통해보세요',
    icon: '💬',
    path: '/community',
    color: '#EC4899'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="menu-grid"
      >
        {menuCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="menu-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(card.path)}
            style={{ backgroundColor: card.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 } 
            }}
          >
            <span className="card-icon">{card.icon}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home; 