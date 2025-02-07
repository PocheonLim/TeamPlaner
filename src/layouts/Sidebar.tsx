import { Link } from 'react-router-dom';
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Reflog" className="logo" />
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <Link to="/">
              <span className="icon">📝</span>
              <span className="text">팀소개</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feature1">
              <span className="icon">📅</span>
              <span className="text">일정</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics">
              <span className="icon">📊</span>
              <span className="text">분석리포트</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/community">
              <span className="icon">💬</span>
              <span className="text">커뮤니티</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 