import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import "./styles.css";
import { countVictoriesAndDefeats, currentDate } from "../../utils";

export function HistoryPage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData } = context;

  const [victoryCounter, setVictoryCounter] = useState<number>(0);
  const [defeatCounter, setDefeatCounter] = useState<number>(0);

  useEffect(() => {
    if (profileData.history.length > 0) {
      const { victories, defeats } = countVictoriesAndDefeats(
        profileData.history,
      );
      setDefeatCounter(defeats);
      setVictoryCounter(victories);
    }
  }, [profileData]);
  return (
    <section className="history">
      <h2 className="history__title">History</h2>
      <h3 className="history__date">{currentDate}</h3>
      <h3 className="history__victoriesCounter">
        {victoryCounter} {profileData.nickname} | {defeatCounter} RivalX
      </h3>
      <ul className="fightList">
        {profileData.history.map((fight, index) => {
          const rivalData = profileData.rivals.find(
            (rival) => rival.id === fight.rivalId,
          );
          return (
            <li key={index} className="fightItem">
              <div className="fightItem__thumbnailsContainer">
                <div className="fightItem__thumbnail">
                  <p className="fightItem__playerNickname">
                    {profileData.nickname}
                  </p>
                  <img
                    className="fightItem__playerImage"
                    src={profileData.image}
                  />
                  <p className="fightItem__character1Text">
                    {fight.character1}
                  </p>
                </div>
                <p className="fightItem__result">
                  {fight.win ? "WIN" : "LOSE"}
                </p>
                <div className="fightItem__thumbnail">
                  <p className="fightItem__rivalNickname">
                    {rivalData?.nickname}
                  </p>
                  <img
                    className="fightItem__rivalImage"
                    src={rivalData?.image}
                  />
                  <p className="fightItem__character2Text">
                    {fight.character2}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
