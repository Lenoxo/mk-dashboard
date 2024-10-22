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
  defeatCounter
}: Props) {
  return (
    <div className="topbar">
      <div className="playerThumbnail">
        <p className="playerThumbnail__nickname">{playerName}</p>
        <img className="playerThumbnail__picture" src={playerImage} />
      </div>
      <span className="topbar__resultCounter1">{victoryCounter}</span>
      <p className="topbar__vs-text">VS</p>
      <span className="topbar__resultCounter2">{defeatCounter}</span>
      <div className="playerThumbnail">
        <p className="playerThumbnail__nickname">{rivalName}</p>
        <img className="playerThumbnail__picture" src={rivalImage} />
      </div>
    </div>
  );
}
