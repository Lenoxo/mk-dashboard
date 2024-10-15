import { useContext } from "react";
import { AppContext } from "../../context";
import { HistoryEntry, ProfileData, Rival } from "../../types";
import "./styles.css";

export function HistoryPage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, historyEntries } = context;

  return (
    <section className="container">
      <h2 className="container__title">History</h2>
      {Object.keys(historyEntries).map((date) => {
        return (
          <article className="history" key={date}>
            <h3 className="history__date">{date}</h3>
            <ul className="fightList">
              {historyEntries[date].map((entry, index) => {
                // Busca la información del rival usando su ID
                const rivalData = profileData.rivals.find(
                  (rival) => rival.id === entry.rivalId,
                );

                if (!rivalData) {
                  throw new Error(
                    "rivalData is undefined, so the entry.rivalId is pointing to a non existing rival",
                  );
                }
                return (
                  <FightResume
                    key={index}
                    profileData={profileData}
                    fight={entry}
                    rivalData={rivalData}
                  />
                );
              })}
            </ul>
          </article>
        );
      })}
    </section>
  );
}

interface FightResumeProps {
  profileData: ProfileData;
  fight: HistoryEntry;
  rivalData: Rival;
}

function FightResume({ profileData, fight, rivalData }: FightResumeProps) {
  return (
    <li className="fightItem">
      <div className="fightItem__thumbnailsContainer">
        <div className="fightItem__thumbnail">
          <p className="fightItem__playerNickname">{profileData.nickname}</p>
          <img className="fightItem__playerImage" src={profileData.image} />
          <p className="fightItem__character1Text">{fight.character1}</p>
        </div>
        <p className="fightItem__result">{fight.win ? "WIN" : "LOSE"}</p>
        <div className="fightItem__thumbnail">
          <p className="fightItem__rivalNickname">{rivalData?.nickname}</p>
          <img className="fightItem__rivalImage" src={rivalData?.image} />
          <p className="fightItem__character2Text">{fight.character2}</p>
        </div>
      </div>
    </li>
  );
}
