import { useContext } from "react";
import { AppContext } from "../../context";
import { HistoryEntry, ProfileData, Rival } from "../../types";
import "./styles.css";

export function HistoryPage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, historyEntries, setHistoryEntries } = context;

  function handleFightDelete(fight: HistoryEntry, fightIndex: number) {
    const updatedEntries = { ...historyEntries };
    updatedEntries[fight.date].splice(fightIndex, 1);

    if (updatedEntries[fight.date].length === 0) {
      delete updatedEntries[fight.date];
    }

    setHistoryEntries(updatedEntries);
  }
  return (
    <section className="container">
      <h2 className="container__title">History</h2>
      {Object.keys(historyEntries)
        .reverse()
        .map((date) => {
          return (
            <article className="history" key={date}>
              <h3 className="history__date">{date}</h3>
              <ul className="fightList">
                {historyEntries[date].map((entry, index) => {
                  if (!profileData) {
                    // Because in this case, there will be no rivals to find their ids
                    return;
                  }
                  // Search the rival info by their rivalId
                  const rivalData = profileData.rivals.find((rival) => rival.id === entry.rivalId);

                  if (!rivalData) {
                    throw new Error(
                      "rivalData is undefined, so the entry.rivalId is pointing to a non existing rival"
                    );
                  }
                  return (
                    <FightResume
                      key={index}
                      index={index}
                      profileData={profileData}
                      fight={entry}
                      rivalData={rivalData}
                      deleteFight={handleFightDelete}
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
  index: number;
  profileData: ProfileData;
  fight: HistoryEntry;
  rivalData: Rival;
  deleteFight(arg0: HistoryEntry, arg1: number): void;
}

function FightResume({ index, profileData, fight, rivalData, deleteFight }: FightResumeProps) {
  return (
    <li className="fightItem">
      <div className="fightItem__thumbnailsContainer">
        <div className="fightItem__thumbnail">
          <p className="fightItem__playerNickname">{profileData.nickname}</p>
          <img className="fightItem__playerImage" src={profileData.image} />
          <p className="fightItem__character1Text">{fight.character1}</p>
        </div>
        <div className="resultContainer">
          <p className="resultContainer__result">{fight.win ? "WIN" : "LOSE"}</p>
          <button className="deleteFight" onClick={() => deleteFight(fight, index)}>
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <div className="fightItem__thumbnail">
          <p className="fightItem__rivalNickname">{rivalData?.nickname}</p>
          <img className="fightItem__rivalImage" src={rivalData?.image} />
          <p className="fightItem__character2Text">{fight.character2}</p>
        </div>
      </div>
    </li>
  );
}
