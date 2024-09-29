import "./styles.css";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddFightButton({ setOpenModal }: Props) {
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
