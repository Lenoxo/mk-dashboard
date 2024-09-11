import "./styles.css";

export function AddFightButton() {
  function addFight() {
    console.info("Button for addFight pressed");
  }
  return (
    <div className="add-fight">
      <button onClick={addFight} className="add-fight__button">
        +
      </button>
    </div>
  );
}
