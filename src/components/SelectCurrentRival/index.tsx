import { Rival } from "../../types";
import "./styles.css";

interface Props {
  rivals: Rival[];
  setCurrentRivalId: React.Dispatch<React.SetStateAction<Rival["id"]>>;
}

export function SelectCurrentRival({ rivals, setCurrentRivalId }: Props) {
  return (
    <div className="currentRival">
      <label className="currentRival__label" htmlFor="rivalSelect">
        Choose your rival
      </label>

      <select
        className="currentRival__select"
        id="rivalSelect"
        name="rivalOptions"
        onChange={(event) => setCurrentRivalId(event.target.value)}
      >
        <option value="">-- Choose a rival --</option>
        {rivals.map((rival) => {
          return (
            <option key={rival.id} value={rival.id}>
              {rival.nickname}
            </option>
          );
        })}
      </select>
    </div>
  );
}
