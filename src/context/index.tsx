import { createContext, useEffect } from "react";
import { ReactNode, useState } from "react";
import { ProfileData, CharacterData, HistoryEntries } from "../types";
import { asyncLocalStorage } from "../utils";
import { characters } from "./characters";

interface AppContextType {
  profileData: ProfileData | null;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  charactersData: CharacterData[];
  setCharactersData: React.Dispatch<React.SetStateAction<CharacterData[]>>;
  historyEntries: HistoryEntries;
  setHistoryEntries: React.Dispatch<React.SetStateAction<HistoryEntries>>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: ReactNode }) {
  // const [profileData, setProfileData] = useState<ProfileData | null>({
  //   nickname: "Lenoxo",
  //   image: "https://avatarfiles.alphacoders.com/359/thumb-1920-359966.jpg",
  //   rivals: [
  //     {
  //       id: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
  //       nickname: "Rival 1",
  //       image: "https://avatarfiles.alphacoders.com/362/thumb-1920-362804.jpg",
  //     },
  //     {
  //       id: "b1c5d418-9894-4ecf-8b98-d5fcabc2aa25",
  //       nickname: "Rival 2",
  //       image: "https://avatarfiles.alphacoders.com/362/thumb-1920-362804.jpg",
  //     },
  //   ],
  // });
  //
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntries>({});
  // const [historyEntries, setHistoryEntries] = useState<HistoryEntries>({
  //   "13/10/2024": [
  //     {
  //       date: "13/10/2024",
  //       rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
  //       character2: "Scorpion",
  //       character1: "Subzero",
  //       win: true,
  //     },
  //   ],
  //   "14/10/2024": [
  //     {
  //       date: "14/10/2024",
  //       rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
  //       character2: "Scorpion",
  //       character1: "Subzero",
  //       win: true,
  //     },
  //     {
  //       date: "14/10/2024",
  //       rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
  //       character2: "Scorpion",
  //       character1: "Subzero",
  //       win: false,
  //     },
  //     {
  //       date: "14/10/2024",
  //       rivalId: "a0c5d418-9894-4ecf-8b98-d5fcabc2aa25",
  //       character2: "Scorpion",
  //       character1: "Subzero",
  //       win: true,
  //     },
  //   ],
  // });
  const [charactersData, setCharactersData] = useState<CharacterData[]>(characters);

  const [loading, setLoading] = useState<boolean>(true);

  // Read the localStorage data and set HistoryEntries and ProfileData if it exists

  useEffect(() => {
    async function readHistoryEntries() {
      const result = await asyncLocalStorage.getItem("history");
      if (!result) {
        console.info("There is no prior data in localStorage for history key");
        return;
      }

      const parsedResult = (await JSON.parse(result)) as HistoryEntries;
      setHistoryEntries(parsedResult);
    }

    async function readProfileData() {
      const result = await asyncLocalStorage.getItem("profile");
      if (!result) {
        console.info("There is no prior data in localStorage for profile key");
        setLoading(false);
        return;
      }

      const parsedResult = (await JSON.parse(result)) as ProfileData;
      setProfileData(parsedResult);
      setLoading(false);
    }

    readProfileData();
    readHistoryEntries();
  }, []);

  // When profileData is updated, saving it's value to localStorage

  useEffect(() => {
    if (!profileData) {
      // Because in this case is a new user that is working with the app
      return;
    }
    asyncLocalStorage.setItem("profile", profileData);
  }, [profileData]);

  // When historyEntries are updated, saving it's value to localStorage

  useEffect(() => {
    if (loading) {
      // To prevent an error that overwrites the historyEntries in localStorage with the initial value of the state with an empty object
      return;
    }
    asyncLocalStorage.setItem("history", historyEntries);
  }, [historyEntries, loading]);

  return (
    <AppContext.Provider
      value={{
        profileData,
        setProfileData,
        charactersData,
        setCharactersData,
        historyEntries,
        setHistoryEntries,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
