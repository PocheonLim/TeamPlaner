import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="welcome-message">
          <h1>사용자님 안녕하세요</h1>
          <p>체계적인 계획을 세우고 이루세요</p>
        </div>
        <div className="header-actions">
          <button className="settings-btn">
            <span className="icon">⚙️</span>
          </button>
          <button className="profile-btn">
            <span className="icon">👤</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 