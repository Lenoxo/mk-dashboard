import "./styles.css";

interface Props {
  playerName: string;
  playerImage: string;
  rivalName: string;
  rivalImage: string;
  victoryCounter: number;
  defeatCounter: number;
}

export function TopBar({
  playerName,
  playerImage,
  rivalName,
  rivalImage,
  victoryCounter,
  defeatCounter,
}: Props) {
  return (
    <nav className="topbar">
      <div className="player-thumbnail">
        <p className="player-thumbnail__nickname">{playerName}</p>
        <img className="player-thumbnail__picture" src={playerImage} />
      </div>
      <span className="topbar__result-counter-1">{victoryCounter}</span>
      <p className="topbar__vs-text">VS</p>
      <span className="topbar__result-counter-2">{defeatCounter}</span>
      <div className="player-thumbnail">
        <p className="player-thumbnail__nickname">{rivalName}</p>
        <img className="player-thumbnail__picture" src={rivalImage} />
      </div>
    </nav>
  );
}
