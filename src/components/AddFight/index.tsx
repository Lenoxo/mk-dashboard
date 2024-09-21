import "./styles.css";

export function AddFightButton() {
  function addFight() {
    console.info("Button for addFight pressed");
  }
  return (
    <div className="addFight">
      <button onClick={addFight} className="addFight__button">
        +
      </button>
    </div>
  );
}
