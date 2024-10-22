import { HistoryEntry } from "../../types";
import "./styles.css";

interface Props {
  fightData: HistoryEntry;
  character1Image: string;
  character2Image: string;
}

export function FightResult({ fightData, character1Image, character2Image }: Props) {
  const { character1, character2, win } = fightData;
  return (
    <article className="fightResult">
      <img className="fightResult__character1Image" src={character1Image} alt={character1} />
      <img className="fightResult__character2Image" src={character2Image} alt={character2} />
      <div className={`fightBanner ${!win && "fightBanner--defeat"}`}>
        <span className="fightBanner__character1Text">{character1}</span>
        <p className="fightBanner__vs-text">VS</p>
        <span className="fightBanner__character2Text">{character2}</span>
      </div>
    </article>
  );
}
