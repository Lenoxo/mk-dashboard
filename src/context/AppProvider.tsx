import { ReactNode, useEffect, useState } from "react";
import { ProfileData, CharacterData, HistoryEntry } from "../types";
import { currentDate, countVictoriesAndDefeats } from "../utils";
import { AppContext } from ".";

export function AppProvider({ children }: { children: ReactNode }) {
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
    <AppContext.Provider
      value={{
        profileData,
        setProfileData,
        charactersData,
        setCharactersData,
        victoryCounter,
        defeatCounter,
        currentDayFights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
