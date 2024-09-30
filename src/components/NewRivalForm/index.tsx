import { useContext, useRef, useState } from "react";
import "./styles.css";
import { AppContext } from "../../context";
import { Rival } from "../../types";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewRivalForm({ setOpenModal }: Props) {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, setProfileData } = context;

  const nicknameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [imageValue, setImageValue] = useState<string | null>(null);

  function handleImageChange() {
    if (imageRef.current === null) {
      throw new Error(
        "imageRef.current is null, check your usage for the component",
      );
    }

    setImageValue(imageRef.current.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nicknameRef.current === null) {
      throw new Error(
        "nicknameRef.current is null, check your usage for the component",
      );
    }

    if (imageRef.current === null) {
      throw new Error(
        "imageRef.current is null, check your usage for the component",
      );
    }

    const newRival: Rival = {
      nickname: nicknameRef.current.value,
      image: imageRef.current.value,
    };

    const updatedRivals = [...profileData.rivals];
    updatedRivals.push(newRival);

    setProfileData({
      ...profileData,
      rivals: updatedRivals,
    });

    setOpenModal(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="nicknameInput">
        Write your rival's nickname
      </label>
      <input
        className="form__input"
        id="nicknameInput"
        type="text"
        ref={nicknameRef}
        required
      />

      <label className="form__label" htmlFor="imageInput">
        Paste your rival's picture link
      </label>
      <input
        className="form__input"
        id="imageInput"
        type="url"
        ref={imageRef}
        required
        onChange={handleImageChange}
        placeholder="both .gif and .png work"
      />

      {imageValue && (
        <div className="form__preview">
          <p className="form__preview__text">Preview</p>
          <img className="form__preview__rivalImage" src={imageValue} />
        </div>
      )}

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
