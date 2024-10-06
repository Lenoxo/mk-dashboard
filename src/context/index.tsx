import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";
import { ProfileData, CharacterData, HistoryEntry } from "../types";
import { currentDate, countVictoriesAndDefeats } from "../utils";

interface AppContextType {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  charactersData: CharacterData[];
  setCharactersData: React.Dispatch<React.SetStateAction<CharacterData[]>>;
  victoryCounter: number;
  defeatCounter: number;
  currentDayFights: HistoryEntry[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: "Lenoxo",
    image: "https://avatarfiles.alphacoders.com/359/thumb-1920-359966.jpg",
    rivals: [
      {
        id: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
        nickname: "Rival 1",
        image: "https://avatarfiles.alphacoders.com/362/thumb-1920-362804.jpg",
      },
    ],
    history: [
      {
        date: currentDate,
        rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
        character2: "Scorpion",
        character1: "Subzero",
        win: true,
      },
      {
        date: currentDate,
        rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
        character2: "Scorpion",
        character1: "Subzero",
        win: false,
      },
      {
        date: currentDate,
        rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
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

export { AppContext, AppProvider };
