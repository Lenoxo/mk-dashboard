export function NewFightForm({ setOpenModal }) {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form saved");
    setOpenModal(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Choose your rival</label>
      <input type="text" />

      <label>Choose your character</label>
      <input type="text" />

      <label>Choose your rival's character</label>
      <input type="text" />

      <label>Did you win?</label>
      <input type="checkbox" />

      <button type="submit">Save</button>
    </form>
  );
}
