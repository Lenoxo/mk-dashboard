import "./styles.css";

export function AddRival() {
  return (
    <section className="profile__addRival">
      <h2 className="profile__addRival__heading">Rivals</h2>
      <button
        className="profile__addRival__button"
        onClick={() => console.info("AddRival pressed")}
      >
        Add
      </button>
    </section>
  );
}
