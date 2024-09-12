import "./styles.css";

export function FightResult() {
  // Añadir position relative al article, y ubicar las imagenes y el banner con position absolute
  return (
    <article className="fight-result">
      <img className="fight-result__character-1-image" src="/subzero.png" />
      <img className="fight-result__character-2-image" src="/scorpion.png" />
      <div className="fight-banner">
        <span className="fight-banner__character-1-text">Subzero</span>
        <p className="fight-banner__vs-text">VS</p>
        <span className="fight-banner__character-2-text">Scorpion</span>
      </div>
    </article>
  );
}
