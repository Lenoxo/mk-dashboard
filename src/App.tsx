import { useContext, useState } from "react";
import { AddFightButton } from "./components/AddFight";
import { FightResult } from "./components/FightResult";
import { TopBar } from "./components/Topbar";
import "./styles.css";
import { HistoryEntry } from "./types";
import { Modal } from "./components/Modal";
import { NewFightForm } from "./components/NewFightForm";
import { AppContext } from "./context";

function App() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const {
    profileData,
    charactersData,
    victoryCounter,
    defeatCounter,
    currentDayFights,
  } = context;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isRivalData, setIsRivalData] = useState<boolean>(
    profileData.rivals.length > 0,
  );

  return (
    <>
      {/* <header>MK-Dashboard</header> */}
      {isRivalData && (
        <TopBar
          playerName={profileData.nickname}
          playerImage={profileData.image}
          rivalName={profileData.rivals[0].nickname}
          rivalImage={profileData.rivals[0].image}
          victoryCounter={victoryCounter}
          defeatCounter={defeatCounter}
        />
      )}
      <main>
        {currentDayFights
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
      </main>

      <AddFightButton setOpenModal={setOpenModal} />
      {openModal && (
        <Modal>
          <NewFightForm setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
