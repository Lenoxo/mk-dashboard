export function AddFightButton() {
  function addFight() {
    console.info("Button for addFight pressed");
  }
  return <button onClick={addFight}>Add</button>;
}
