import { useRef } from "react";
import { currentDate } from "../../utils/currentDate";

export function NewFightForm({ setOpenModal }) {
  const rivalRef = useRef(null);
  const character1Ref = useRef(null);
  const character2Ref = useRef(null);
  const winRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const newFight = {
      date: currentDate,
      rival: rivalRef.current.value,
      character2: character2Ref.current.value,
      character1: character1Ref.current.value,
      win: winRef.current.checked ? true : false,
    };
    console.info(newFight);
    console.log("Form saved");
    setOpenModal(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Choose your rival</label>
      <input ref={rivalRef} type="text" />

      <label>Choose your character</label>
      <input ref={character1Ref} type="text" />

      <label>Choose your rival's character</label>
      <input ref={character2Ref} type="text" />

      <label>Did you win?</label>
      <input ref={winRef} type="checkbox" name="win" />

      <button type="submit">Save</button>
    </form>
  );
}
