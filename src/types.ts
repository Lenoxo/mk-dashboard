export interface ProfileData {
  nickname: string;
  image: string;
  rivals: Rival[];
  history: HistoryEntry[];
}

export interface HistoryEntry {
  date: string;
  rivalId: string;
  character1: string;
  character2: string;
  win: boolean;
}

export interface Rival {
  id: string;
  nickname: string;
  image: string;
}

export interface CharacterData {
  name: string;
  imageUrl: string;
}
