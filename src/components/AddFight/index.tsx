import "./styles.css";

export function AddFightButton({ setOpenModal }) {
  function handleClick() {
    setOpenModal(true);
  }
  return (
    <div className="addFight">
      <button onClick={handleClick} className="addFight__button">
        +
      </button>
    </div>
  );
}
