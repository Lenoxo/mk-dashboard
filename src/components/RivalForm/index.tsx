import { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import { AppContext } from "../../context";
import { Rival } from "../../types";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export function RivalForm({ setOpenModal }: Props) {
  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, setProfileData } = context;
  const nicknameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageValue, setImageValue] = useState<string | null>(null);
  const [rivalData, setRivalData] = useState<Rival | null>(null);

  const { id } = useParams();
  const parsedId: number = parseInt(id);

  useEffect(() => {
    if (!id) {
      // Because in this case, the user is using the form in /profile
      // No in /profile/rivals/:id
      return;
    } else {
      if (typeof parsedId !== "number") {
        throw new Error("The current rival id does not exist");
      }

      if (profileData.rivals[parsedId]) {
        setRivalData(profileData.rivals[parsedId]);
      }
    }
  }, [id, parsedId, profileData.rivals]);

  function handleImageChange() {
    if (imageRef.current === null) {
      throw new Error(
        "imageRef.current is null, check your usage for the component",
      );
    }

    setImageValue(imageRef.current.value);
  }
  function renderCancelButton() {
    if (setOpenModal) {
      return (
        <button
          className="form__button form__button--cancel"
          type="button"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancel
        </button>
      );
    } else {
      return (
        <Link className="form__button form__button--cancel" to="/profile">
          Cancel
        </Link>
      );
    }
  }

  function addNewRival(newRivalData: Rival) {
    const updatedRivals = [...profileData.rivals];
    updatedRivals.push(newRivalData);

    setProfileData({
      ...profileData,
      rivals: updatedRivals,
    });

    if (setOpenModal) {
      setOpenModal(false);
    }
  }

  function updateRivalData(updatedRivalData: Rival, rivalId: number) {
    const updatedRivals = [...profileData.rivals];
    updatedRivals[rivalId] = updatedRivalData;

    setProfileData({
      ...profileData,
      rivals: updatedRivals,
    });

    navigate("/profile");
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

    const updatedRivalData: Rival = {
      nickname: nicknameRef.current.value,
      image: imageRef.current.value,
    };

    if (rivalData) {
      updateRivalData(updatedRivalData, parsedId);
    } else {
      addNewRival(updatedRivalData);
    }
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="nicknameInput">
        Write your rival's nickname
      </label>
      <input
        defaultValue={rivalData?.nickname}
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
        defaultValue={rivalData?.image}
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

      {renderCancelButton()}
    </form>
  );
}