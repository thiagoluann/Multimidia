export default function Header() {
  return (
    <div className="player-header">
      <div className="logo">
        <i className="fas fa-crown logo-icon"></i>
        <div className="logo-text">Disney+</div>
      </div>
      <div className="nav-controls">
        <i className="fas fa-search"></i>
        <i className="fas fa-bell"></i>
        <i className="fas fa-user"></i>
      </div>
    </div>
  );
}
