import { useContext } from "react";
import { AppContext } from "../../context";
import "./styles.css";

export function HistoryPage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData } = context;

  return (
    <div>
      <p>History</p>
      <ul>
        {profileData.history.map((fight) => {
          return (
            <li>
              <p>{fight.win ? "true" : "false"}</p>
              <p>{fight.character1}</p>
              <p>{fight.character2}</p>
              <p>{fight.rival}</p>
              <p>{fight.date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
