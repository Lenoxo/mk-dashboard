import { useRef } from "react";
import { currentDate } from "../../utils/currentDate";
import { ProfileData } from "../../types";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  profileData: ProfileData;
}

export function NewFightForm({
  setOpenModal,
  profileData,
  setProfileData,
}: Props) {
  const rivalRef = useRef<HTMLInputElement>(null);
  const character1Ref = useRef<HTMLInputElement>(null);
  const character2Ref = useRef<HTMLInputElement>(null);
  const winRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Añadir validación de datos escritos en el form / cambiar el tipo de input a Select.

    const newFight = {
      date: currentDate,
      rival: rivalRef.current?.value || "",
      character2: character2Ref.current?.value || "",
      character1: character1Ref.current?.value || "",
      win: winRef.current?.checked ? true : false,
    };

    const updatedHistory = [...profileData.history];
    updatedHistory.push(newFight);

    setProfileData({
      ...profileData,
      history: updatedHistory,
    });
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
