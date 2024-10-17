import { useContext } from "react";
import { AppContext } from "../../context";
import { HistoryEntry, ProfileData, Rival } from "../../types";
import "./styles.css";
import { currentDate } from "../../utils";

export function HistoryPage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const {
    setCurrentDayFights,
    profileData,
    historyEntries,
    setHistoryEntries,
    countVictoriesAndDefeats,
  } = context;

  // TODO: Optimize the history render and delete if possible

  function handleFightDelete(fight: HistoryEntry, fightIndex: number) {
    const updatedEntries = { ...historyEntries };
    updatedEntries[fight.date].splice(fightIndex, 1);

    if (updatedEntries[fight.date].length === 0) {
      delete updatedEntries[fight.date];
    }

    setHistoryEntries(updatedEntries);

    if (fight.date === currentDate) {
      setCurrentDayFights(updatedEntries[currentDate]);
      countVictoriesAndDefeats(updatedEntries[currentDate]);
    }
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

function FightResume({
  index,
  profileData,
  fight,
  rivalData,
  deleteFight,
}: FightResumeProps) {
  return (
    <li className="fightItem">
      <div className="fightItem__thumbnailsContainer">
        <div className="fightItem__thumbnail">
          <p className="fightItem__playerNickname">{profileData.nickname}</p>
          <img className="fightItem__playerImage" src={profileData.image} />
          <p className="fightItem__character1Text">{fight.character1}</p>
        </div>
        <p className="fightItem__result">{fight.win ? "WIN" : "LOSE"}</p>
        <button onClick={() => deleteFight(fight, index)}>Delete</button>
        <div className="fightItem__thumbnail">
          <p className="fightItem__rivalNickname">{rivalData?.nickname}</p>
          <img className="fightItem__rivalImage" src={rivalData?.image} />
          <p className="fightItem__character2Text">{fight.character2}</p>
        </div>
      </div>
    </li>
  );
}
