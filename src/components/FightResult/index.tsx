import "./styles.css";

export function FightResult({ fightData, character1Image, character2Image }) {
  const { character1, character2, win } = fightData;
  return (
    <article className="fight-result">
      <img
        className="fight-result__character-1-image"
        src={character1Image}
        alt={character1}
      />
      <img
        className="fight-result__character-2-image"
        src={character2Image}
        alt={character2}
      />
      <div className={`fight-banner ${!win && "fight-banner--defeat"}`}>
        <span className="fight-banner__character-1-text">{character1}</span>
        <p className="fight-banner__vs-text">VS</p>
        <span className="fight-banner__character-2-text">{character2}</span>
      </div>
    </article>
  );
}
