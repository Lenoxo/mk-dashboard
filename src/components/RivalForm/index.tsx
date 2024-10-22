import { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import { AppContext } from "../../context";
import { Rival } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const [rivalIndex, setRivalIndex] = useState<number>(0);

  const { id } = useParams();

  if (!profileData) {
    throw new Error(
      "profileData is null, you should not render this component when this happens",
    );
  }

  useEffect(() => {
    if (!id) {
      // Because in this case, the user is using the form in /profile
      // No in /profile/rivals/:id
      return;
    }
    if (typeof id !== "string") {
      throw new Error("The current rival id in the url does not exist");
    }

    let tempIndex = 0;

    for (let i = 0; i < profileData.rivals.length; i++) {
      if (profileData.rivals[i].id !== id) {
        continue;
      }
      tempIndex = i;
      setRivalIndex(i);
      break;
    }

    if (profileData.rivals[tempIndex]) {
      setRivalData(profileData.rivals[tempIndex]);
      setImageValue(profileData.rivals[tempIndex].image);
      return;
    }
  }, [id, profileData.rivals]);

  function handleImageChange() {
    if (imageRef.current === null) {
      throw new Error(
        "imageRef.current is null, check your usage for the component",
      );
    }

    setImageValue(imageRef.current.value);
  }

  function handleCancel() {
    if (setOpenModal) {
      setOpenModal(false);
    } else {
      navigate("/profile");
    }
  }

  function addNewRival(newRivalData: Rival) {
    if (!profileData) {
      throw new Error(
        "profileData is null, you should not render this component when this happens",
      );
    }

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

  function updateRivalData(updatedRivalData: Rival) {
    if (!profileData) {
      throw new Error(
        "profileData is null, you should not render this component when this happens",
      );
    }

    const updatedRivals = [...profileData.rivals];
    updatedRivals[rivalIndex] = updatedRivalData;

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

    const newRivalData: Rival = {
      id: rivalData?.id || uuidv4(),
      nickname: nicknameRef.current.value,
      image: imageRef.current.value,
    };

    if (rivalData) {
      updateRivalData(newRivalData);
    } else {
      addNewRival(newRivalData);
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

      <div className="form__preview">
        <p className="form__preview__text">Preview</p>
        <img className="form__preview__rivalImage" src={imageValue || ""} />
      </div>

      <button className="form__button form__button--submit" type="submit">
        Save
      </button>

      <button
        className="form__button form__button--cancel"
        type="button"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
}
