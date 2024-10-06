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
        {profileData.history.map((fight, index) => {
          const rivalData = profileData.rivals.find(
            (rival) => rival.id === fight.rivalId,
          );
          return (
            <li key={index}>
              <p>{fight.win ? "true" : "false"}</p>
              <p>{fight.character1}</p>
              <p>{fight.character2}</p>
              <p>{rivalData?.nickname}</p>
              <p>{fight.date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
