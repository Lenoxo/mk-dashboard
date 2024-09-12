import "./styles.css";

export function TopBar() {
  return (
    <nav className="topbar">
      <div className="player-thumbnail">
        <p className="player-thumbnail__nickname">Player 1</p>
        <img
          className="player-thumbnail__picture"
          src="https://avatarfiles.alphacoders.com/359/thumb-1920-359966.jpg"
        />
      </div>
      <span className="topbar__result-counter-1">2</span>
      <p className="topbar__vs-text">VS</p>
      <span className="topbar__result-counter-2">1</span>
      <div className="player-thumbnail">
        <p className="player-thumbnail__nickname">Player 2</p>
        <img
          className="player-thumbnail__picture"
          src="https://avatarfiles.alphacoders.com/362/thumb-1920-362804.jpg"
        />
      </div>
    </nav>
  );
}
