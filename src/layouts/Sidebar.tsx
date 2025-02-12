import { Link } from 'react-router-dom';
import "../styles/layout/Sidebar.css";
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
              <span className="icon">🏠</span>
              <span className="text">홈</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule">
              <span className="icon">📅</span>
              <span className="text">일정</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/diary">
              <span className="icon">📝</span>
              <span className="text">운동일지</span>
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