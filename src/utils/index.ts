import { HistoryEntry } from "../types";

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

const now = new Date();
const currentDate = now.toLocaleDateString();

export { currentDate, countVictoriesAndDefeats };
