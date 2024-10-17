import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";
import {
  ProfileData,
  CharacterData,
  HistoryEntry,
  HistoryEntries,
} from "../types";
import { currentDate } from "../utils";

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
  countVictoriesAndDefeats(history: HistoryEntry[]): void;
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
  });

  const [historyEntries, setHistoryEntries] = useState<HistoryEntries>({
    "13/10/2024": [
      {
        date: "13/10/2024",
        rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
        character2: "Scorpion",
        character1: "Subzero",
        win: true,
      },
    ],
    "14/10/2024": [
      {
        date: "14/10/2024",
        rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
        character2: "Scorpion",
        character1: "Subzero",
        win: true,
      },
      {
        date: "14/10/2024",
        rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
        character2: "Scorpion",
        character1: "Subzero",
        win: false,
      },
      {
        date: "14/10/2024",
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
      setCurrentDayFights(historyEntries[currentDate]);
      countVictoriesAndDefeats(historyEntries[currentDate]);
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
        countVictoriesAndDefeats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
