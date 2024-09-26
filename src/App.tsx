import { useEffect, useState } from "react";
import { AddFightButton } from "./components/AddFight";
import { FightResult } from "./components/FightResult";
import { TopBar } from "./components/Topbar";
import "./styles.css";
import { currentDate } from "./utils/currentDate";
import { HistoryEntry, ProfileData, CharacterData } from "./types";
import { Modal } from "./components/Modal";
import { NewFightForm } from "./components/NewFightForm";

function countVictoriesAndDefeats(history: HistoryEntry[]) {
  let victories: number = 0;
  let defeats: number = 0;
  history.forEach((fight) => {
    if (fight.win) {
      victories++;
    } else {
      defeats++;
    }
  });
  return { victories, defeats };
}

function App() {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: "Lenoxo",
    image: "https://avatarfiles.alphacoders.com/359/thumb-1920-359966.jpg",
    rivals: [
      {
        nickname: "Rival 1",
        image: "https://avatarfiles.alphacoders.com/362/thumb-1920-362804.jpg",
      },
    ],
    history: [
      {
        date: currentDate,
        rival: "Rival 1",
        character2: "Scorpion",
        character1: "Subzero",
        win: true,
      },
      {
        date: currentDate,
        rival: "Rival 1",
        character2: "Scorpion",
        character1: "Subzero",
        win: false,
      },
      {
        date: currentDate,
        rival: "Rival 1",
        character2: "Scorpion",
        character1: "Subzero",
        win: true,
      },
    ],
  });

  const [charactersData, setCharactersData] = useState<CharacterData[]>([
    { name: "Scorpion", imageUrl: "https://imgur.com/609Ay70.png" },
    { name: "Subzero", imageUrl: "https://imgur.com/i6pgo8i.png" },
  ]);

  const [currentDayFights, setCurrentDayFights] = useState<HistoryEntry[]>([]);
  const [victoryCounter, setVictoryCounter] = useState<number>(0);
  const [defeatCounter, setDefeatCounter] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (profileData.history.length > 0) {
      setCurrentDayFights(profileData.history);
      const { victories, defeats } = countVictoriesAndDefeats(
        profileData.history,
      );
      setDefeatCounter(defeats);
      setVictoryCounter(victories);
    }
  }, [profileData]);

  return (
    <>
      {/* <header>MK-Dashboard</header> */}
      <TopBar
        playerName={profileData.nickname}
        playerImage={profileData.image}
        rivalName={profileData.rivals[0].nickname}
        rivalImage={profileData.rivals[0].image}
        victoryCounter={victoryCounter}
        defeatCounter={defeatCounter}
      />
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
          <NewFightForm
            setOpenModal={setOpenModal}
            profileData={profileData}
            charactersData={charactersData}
            setProfileData={setProfileData}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
