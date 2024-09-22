import { useRef } from "react";
import { currentDate } from "../../utils/currentDate";
import { ProfileData, CharacterData } from "../../types";
import "./styles.css";

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
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="rivalSelect">
        Choose your rival
      </label>
      <select
        className="form__select"
        id="rivalSelect"
        name="rivalOptions"
        ref={rivalRef}
      >
        {rivalsList.map((rival, index) => {
          return (
            <option
              key={index}
              className="form__select__option"
              value={rival.nickname}
            >
              {rival.nickname}
            </option>
          );
        })}
      </select>

      <label className="form__label" htmlFor="character1Select">
        Choose your character
      </label>
      <select
        className="form__select"
        id="character1Select"
        name="character1Options"
        ref={character1Ref}
      >
        {charactersData.map((character1, index) => {
          return (
            <option
              key={index}
              className="form__select__option"
              value={character1.name}
            >
              {character1.name}
            </option>
          );
        })}
      </select>

      <label className="form__label" htmlFor="character2Select">
        Choose your rival's character
      </label>
      <select
        className="form__select"
        id="character2Select"
        name="character2Options"
        ref={character2Ref}
      >
        {charactersData.map((character2, index) => {
          return (
            <option
              key={index}
              className="form__select__option"
              value={character2.name}
            >
              {character2.name}
            </option>
          );
        })}
      </select>

      {/* This is an implicit label, I read about them in MDN docs */}

      <label className="form__label">
        Did you win?
        <input
          className="form__checkbox"
          ref={winRef}
          type="checkbox"
          name="win"
        />
      </label>

      <button className="form__button form__button--submit" type="submit">
        Save
      </button>

      <button
        className="form__button form__button--cancel"
        type="button"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
}
