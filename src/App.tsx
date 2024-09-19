import { useEffect, useState } from "react";
import { AddFightButton } from "./components/AddFight";
import { FightResult } from "./components/FightResult";
import { TopBar } from "./components/Topbar";
import "./styles.css";

const now = new Date();
const currentDate = now.toLocaleDateString();

function countVictoriesAndDefeats(history: []) {
  let victories: number = 0;
  let defeats: number = 0;
  console.info(history);
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
  const [profileData, setProfileData] = useState({
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

  const [charactersData, setCharactersData] = useState([
    { name: "Scorpion", imageUrl: "/scorpion.png" },
    { name: "Subzero", imageUrl: "/subzero.png" },
  ]);

  const [currentDayFights, setCurrentDayFights] = useState([]);
  const [victoryCounter, setVictoryCounter] = useState(0);
  const [defeatCounter, setDefeatCounter] = useState(0);

  useEffect(() => {
    if (profileData.history.length > 0) {
      setCurrentDayFights(profileData.history);
      const { victories, defeats } = countVictoriesAndDefeats(
        profileData.history,
      );
      setDefeatCounter(defeats);
      setVictoryCounter(victories);
    }
  }, []);

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
        {profileData.history.map((fight) => {
          const character1Data = charactersData.find(
            (character) => character.name === fight.character1,
          );
          const character2Data = charactersData.find(
            (character) => character.name === fight.character2,
          );

          return (
            <FightResult
              fightData={fight}
              character1Image={character1Data?.imageUrl}
              character2Image={character2Data?.imageUrl}
            />
          );
        })}
      </main>
      <AddFightButton />
    </>
  );
}

export default App;
