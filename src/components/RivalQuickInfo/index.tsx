import { Link } from "react-router-dom";
import "./styles.css";
import { Rival } from "../../types";

interface Props {
  name: string;
  image: string;
  rivalId: string;
  deleteRival(rivalId: Rival["id"]): void;
}

export function RivalQuickInfo({ name, image, rivalId, deleteRival }: Props) {
  return (
    <article className="rivalQuickInfo">
      <img className="rivalQuickInfo__image" src={image} />
      <p className="rivalQuickInfo__nickname">{name}</p>
      <Link className="rivalQuickInfo__edit" to={`/profile/rivals/${rivalId}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </Link>
      <button onClick={() => deleteRival(rivalId)}>
        <svg
          className="rivalQuickInfo__delete"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </article>
  );
}
