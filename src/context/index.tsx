import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";
import {
  ProfileData,
  CharacterData,
  HistoryEntry,
  HistoryEntries,
} from "../types";
import { currentDate, countVictoriesAndDefeats } from "../utils";

interface AppContextType {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  charactersData: CharacterData[];
  setCharactersData: React.Dispatch<React.SetStateAction<CharacterData[]>>;
  victoryCounter: number;
  defeatCounter: number;
  currentDayFights: HistoryEntry[];
  historyEntries: HistoryEntries;
  setHistoryEntries: React.Dispatch<React.SetStateAction<HistoryEntries>>;
  setCurrentDayFights: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
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

  const [historyEntries, setHistoryEntries] = useState<HistoryEntries>({
    "14/10/2024": [
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
    "13/10/2024": [
      {
        date: "2024-10-13",
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
    if (!historyEntries[currentDate]) {
      // Because in this case there are no existing fights for the currentDate
      return;
    }
    if (historyEntries[currentDate].length > 0) {
      setCurrentDayFights(historyEntries[currentDate]);
      const { victories, defeats } = countVictoriesAndDefeats(
        historyEntries[currentDate],
      );
      setDefeatCounter(defeats);
      setVictoryCounter(victories);
    }
  }, [historyEntries]);

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
        historyEntries,
        setHistoryEntries,
        setCurrentDayFights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
