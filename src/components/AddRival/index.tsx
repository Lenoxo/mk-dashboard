import "./styles.css";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddRival({ setOpenModal }: Props) {
  return (
    <section className="profile__addRival">
      <h2 className="profile__addRival__heading">Rivals</h2>
      <button
        className="profile__addRival__button"
        onClick={() => setOpenModal(true)}
      >
        Add
      </button>
    </section>
  );
}
