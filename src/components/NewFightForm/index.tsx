import { useContext, useRef, useState } from "react";
import { currentDate } from "../../utils";
import { CharacterData, HistoryEntry } from "../../types";
import "./styles.css";
import { AppContext } from "../../context";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewFightForm({ setOpenModal }: Props) {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, charactersData, historyEntries, setHistoryEntries } = context;

  const rivalRef = useRef<HTMLSelectElement>(null);
  const character1Ref = useRef<HTMLSelectElement>(null);
  const character2Ref = useRef<HTMLSelectElement>(null);
  const winRef = useRef<HTMLInputElement>(null);

  const [selectedCharacter1, setSelectedCharacter1] = useState<CharacterData>();
  const [selectedCharacter2, setSelectedCharacter2] = useState<CharacterData>();

  if (profileData === null) {
    throw new Error(`profileData is null, this should not be possible at this stage,
because you should only render NewFightForm when there is profileData`);
  }

  const rivalsList = profileData.rivals;

  function handleSelectCharacter1() {
    if (!character1Ref.current) {
      throw new Error("character1Ref.current is undefined");
    }

    // I make a rest here because I left the first option in the select as "Choose an option"
    const characterIndex = character1Ref.current.selectedIndex - 1;
    setSelectedCharacter1(charactersData[characterIndex]);
  }

  function handleSelectCharacter2() {
    if (!character2Ref.current) {
      throw new Error("character2Ref.current is undefined");
    }

    // I make a rest here because I left the first option in the select as "Choose an option"
    const characterIndex = character2Ref.current.selectedIndex - 1;
    setSelectedCharacter2(charactersData[characterIndex]);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newFight: HistoryEntry = {
      date: currentDate,
      rivalId: rivalRef.current?.value || "",
      character2: selectedCharacter2?.name || "",
      character1: selectedCharacter1?.name || "",
      win: winRef.current?.checked ? true : false
    };

    const updatedHistory = { ...historyEntries };
    if (!updatedHistory[currentDate]) {
      updatedHistory[currentDate] = [newFight];
    } else {
      updatedHistory[currentDate].push(newFight);
    }
    setHistoryEntries(updatedHistory);

    setOpenModal(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="rivalSelect">
        Choose your rival
      </label>
      <select className="form__select" id="rivalSelect" name="rivalOptions" ref={rivalRef}>
        {rivalsList.map((rival, index) => {
          return (
            <option key={index} className="form__select__option" value={rival.id}>
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
        onChange={handleSelectCharacter1}
        ref={character1Ref}
        required
      >
        <option className="form__select__option" value="">
          -- Choose an option --
        </option>

        {charactersData.map((character1, index) => {
          return (
            <option key={index} className="form__select__option" value={character1.name}>
              {character1.name}
            </option>
          );
        })}
      </select>
      <img className="form__character1Image" src={selectedCharacter1?.imageUrl} />

      <label className="form__label" htmlFor="character2Select">
        Choose your rival's character
      </label>
      <select
        className="form__select"
        id="character2Select"
        name="character2Options"
        onChange={handleSelectCharacter2}
        ref={character2Ref}
        required
      >
        <option className="form__select__option" value="">
          -- Choose an option --
        </option>

        {charactersData.map((character2, index) => {
          return (
            <option key={index} className="form__select__option" value={character2.name}>
              {character2.name}
            </option>
          );
        })}
      </select>
      <img className="form__character2Image" src={selectedCharacter2?.imageUrl} />

      {/* This is an implicit label, I read about them in MDN docs */}

      <label className="form__label">
        Did you win?
        <input className="form__checkbox" ref={winRef} type="checkbox" name="win" />
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
