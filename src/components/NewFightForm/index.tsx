import { useRef } from "react";
import { currentDate } from "../../utils/currentDate";
import { ProfileData, CharacterData } from "../../types";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  profileData: ProfileData;
  charactersData: CharacterData[];
}

export function NewFightForm({
  setOpenModal,
  profileData,
  charactersData,
  setProfileData,
}: Props) {
  const rivalRef = useRef<HTMLSelectElement>(null);
  const character1Ref = useRef<HTMLSelectElement>(null);
  const character2Ref = useRef<HTMLSelectElement>(null);
  const winRef = useRef<HTMLInputElement>(null);

  const rivalsList = profileData.rivals;

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

    console.info(newFight);
    setOpenModal(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Choose your rival</label>
      {/* <input ref={rivalRef} type="text" /> */}
      <select id="rivalSelect" name="rivalOptions" ref={rivalRef}>
        {rivalsList.map((rival) => {
          return <option value={rival.nickname}>{rival.nickname}</option>;
        })}
      </select>

      <label>Choose your character</label>
      <select
        id="character1Select"
        name="character1Options"
        ref={character1Ref}
      >
        {charactersData.map((character1) => {
          return <option value={character1.name}>{character1.name}</option>;
        })}
      </select>

      <label>Choose your rival's character</label>
      <select
        id="character2Select"
        name="character2Options"
        ref={character2Ref}
      >
        {charactersData.map((character2) => {
          return <option value={character2.name}>{character2.name}</option>;
        })}
      </select>

      <label>Did you win?</label>
      <input ref={winRef} type="checkbox" name="win" />

      <button type="submit">Save</button>
    </form>
  );
}
