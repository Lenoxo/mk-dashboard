import { useContext, useEffect, useRef, useState } from "react";
import { AddFightButton } from "./components/AddFight";
import { FightResult } from "./components/FightResult";
import { TopBar } from "./components/Topbar";
import "./styles.css";
import { HistoryEntry, Rival } from "./types";
import { Modal } from "./components/Modal";
import { NewFightForm } from "./components/NewFightForm";
import { AppContext } from "./context";
import { NoRivalsGuide } from "./components/NoRivalsGuide";
import { currentDate } from "./utils";

function App() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { profileData, charactersData, historyEntries } = context;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentRivalFights, setCurrentRivalFights] = useState<HistoryEntry[]>(
    [],
  );
  const [currentRivalId, setCurrentRivalId] = useState<Rival["id"]>("");

  const rivalRef = useRef<HTMLSelectElement>(null);
  let isRivalData: boolean = false;

  const [victoryCounter, setVictoryCounter] = useState<number>(0);
  const [defeatCounter, setDefeatCounter] = useState<number>(0);

  function countVictoriesAndDefeats(history: HistoryEntry[] | undefined) {
    let victories: number = 0;
    let defeats: number = 0;
    if (!history) {
      // Because in this case there aren't any fights to count
      // So I reset the counters to default values
      setVictoryCounter(victories);
      setDefeatCounter(defeats);
      return;
    }

    history.forEach((fight) => {
      if (fight.win) {
        victories++;
      } else {
        defeats++;
      }
    });
    setVictoryCounter(victories);
    setDefeatCounter(defeats);
  }

  useEffect(() => {
    if (!historyEntries[currentDate]) {
      // Because in this case there are no existing fights for the currentDate
      return;
    }

    if (historyEntries[currentDate].length > 0) {
      const filteredFights = historyEntries[currentDate].filter(
        (fight) => fight.rivalId === currentRivalId,
      );
      setCurrentRivalFights(filteredFights);
      countVictoriesAndDefeats(filteredFights);
    }
  }, [historyEntries, currentRivalId]);

  function renderHeader() {
    if (profileData && profileData.rivals.length > 0) {
      isRivalData = true;
      return (
        <>
          <label className="form__label" htmlFor="rivalSelect">
            Choose your rival
          </label>
          <select
            className="form__select"
            id="rivalSelect"
            name="rivalOptions"
            ref={rivalRef}
            onChange={(event) => setCurrentRivalId(event.target.value)}
          >
            <option value="">-- Choose a rival --</option>
            {profileData.rivals.map((rival) => {
              return (
                <option key={rival.id} value={rival.id}>
                  {rival.nickname}
                </option>
              );
            })}
          </select>
          <TopBar
            playerName={profileData.nickname}
            playerImage={profileData.image}
            rivalName={profileData.rivals[0].nickname}
            rivalImage={profileData.rivals[0].image}
            victoryCounter={victoryCounter}
            defeatCounter={defeatCounter}
          />
        </>
      );
    } else {
      return <NoRivalsGuide />;
    }
  }

  return (
    <>
      {renderHeader()}
      <section className="currentDayFights">
        {currentRivalFights
          ?.map((fight: HistoryEntry, index) => {
            const character1Data = charactersData.find(
              (character) => character.name === fight.character1,
            );
            const character2Data = charactersData.find(
              (character) => character.name === fight.character2,
            );

            if (!character1Data) {
              throw new Error(
                "The character name in history does not exists in charactersData " +
                  character1Data,
              );
            }

            if (!character2Data) {
              throw new Error(
                "The character name in history does not exists in charactersData " +
                  character2Data,
              );
            }

            return (
              <FightResult
                key={index}
                fightData={fight}
                character1Image={character1Data.imageUrl}
                character2Image={character2Data.imageUrl}
              />
            );
          })
          .reverse()}
      </section>

      {isRivalData && <AddFightButton setOpenModal={setOpenModal} />}
      {openModal && (
        <Modal>
          <NewFightForm setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
