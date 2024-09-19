import { useEffect, useState } from "react";
import { AddFightButton } from "./components/AddFight";
import { FightResult } from "./components/FightResult";
import { TopBar } from "./components/Topbar";
import "./styles.css";

const now = new Date();
const currentDate = now.toLocaleDateString();
// const formatDate = { year: "numeric", month: "numeric", day: "numeric" };

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
        character1: "Scorpion",
        character2: "Subzero",
        win: true,
      },
    ],
  });

  const [charactersData, setCharactersData] = useState([
    { name: "Scorpion", imageUrl: "/scorpion.png" },
    { name: "Subzero", imageUrl: "/subzero.png" },
  ]);

  const [currentDayFights, setCurrentDayFights] = useState([]);

  useEffect(() => {
    if (profileData.history.length > 0) {
      setCurrentDayFights(profileData.history);
      // setTimeout(() => {
      //   console.table(currentDayFights);
      // }, 1000);
      console.table(profileData.history);
    }
  }, []);

  console.info(profileData);
  return (
    <>
      {/* <header>MK-Dashboard</header> */}
      <TopBar
        playerName={profileData.nickname}
        playerImage={profileData.image}
        rivalName={profileData.rivals[0].nickname}
        rivalImage={profileData.rivals[0].image}
      />
      <main>
        <FightResult />
        <FightResult />
        <FightResult />
      </main>
      <AddFightButton />
    </>
  );
}

export default App;
