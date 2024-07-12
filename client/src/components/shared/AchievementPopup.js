import './achievementpopup.css';

function AchievementPopup({ isOpen, achievement, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="popup-overlay">
        <div className="popup">
          <h2 className="popup-heading">Achievement Unlocked</h2>
          <i className="fas fa-trophy popup-icon"></i>
          <h3 className="popup-title">{achievement.title}</h3>
          <p className="popup-desc">{achievement.description}</p>
          <div className="popup-btn"onClick={onClose}>See your achievements</div>
        </div>
      </div>
    );
  }

export default AchievementPopup;