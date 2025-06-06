import { useContext } from "react";
import "./styles.css";
import { AppContext } from "../../context";
import { Link } from "react-router-dom";

export function QuickInfo() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }
  const { profileData } = context;

  return (
    <header className="profileHeader">
      <div className="quickInfo">
        <img src={profileData?.image} className="quickInfo__image" />
        <p className="quickInfo__nickname">{profileData?.nickname}</p>
        <Link className="quickInfo__edit" to="/profile/update">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
