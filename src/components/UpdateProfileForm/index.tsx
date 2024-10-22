import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context";

export function UpdateProfileForm() {
  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, setProfileData } = context;
  const nicknameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageValue, setImageValue] = useState<string | null>(null);

  useEffect(() => {
    if (profileData) {
      setImageValue(profileData.image);
    }
  }, [profileData]);

  function handleImageChange() {
    if (imageRef.current === null) {
      throw new Error("imageRef.current is null, check your usage for the component");
    }

    setImageValue(imageRef.current.value);
  }

  function handleCancel() {
    navigate("/profile");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nicknameRef.current === null) {
      throw new Error("nicknameRef.current is null, check your usage for the component");
    }

    if (imageRef.current === null) {
      throw new Error("imageRef.current is null, check your usage for the component");
    }

    if (!profileData) {
      setProfileData({
        nickname: nicknameRef.current.value,
        image: imageRef.current.value,
        rivals: []
      });
    } else {
      setProfileData({
        ...profileData,
        nickname: nicknameRef.current.value,
        image: imageRef.current.value
      });
    }

    navigate("/profile");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="nicknameInput">
        Write your nickname
      </label>
      <input
        defaultValue={profileData?.nickname}
        className="form__input"
        id="nicknameInput"
        type="text"
        ref={nicknameRef}
        required
      />

      <label className="form__label" htmlFor="imageInput">
        Paste your picture link
      </label>
      <input
        defaultValue={profileData?.image}
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
        <img className="form__preview__profileImage" src={imageValue || ""} />
      </div>

      <button className="form__button form__button--submit" type="submit">
        Save
      </button>

      <button className="form__button form__button--cancel" type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
