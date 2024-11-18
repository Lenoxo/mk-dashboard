import { ReactNode, useContext, useState } from "react";
import { Sidebar } from "../Sidebar";
import "./styles.css";
import { AppContext } from "../../context";
import { Loading } from "../LoadingComponent";
import { NavLink } from "react-router-dom";

export function MainLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }

  const { loading } = context;
  return (
    <>
      <Sidebar open={isMenuOpen} setOpen={setIsMenuOpen} />
      <div className={`appWrapper ${isMenuOpen && "appWrapper--move"}`}>
        <Header open={isMenuOpen} setOpen={setIsMenuOpen} />
        {loading && <Loading />}
        {!loading && children}
      </div>
    </>
  );
}

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function Header({ open, setOpen }: Props) {
  return (
    <header className="header">
      Mk-Dashboard
      <ul className="header__list">
        <li>
          <NavLink className="header__list__link" to="/">
            <svg
              className="header__link__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink className="header__list__link" to="/profile">
            <svg
              className="header__link__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink className="header__list__link" to="/history">
            <svg
              className="header__link__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>History</p>
          </NavLink>
        </li>
      </ul>
      <button
        className={`header__button ${open && "header__button--disabled"}`}
        disabled={open ? true : false}
        onClick={() => setOpen(!open)}
      >
        <svg
          className="header__button__icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>
  );
}
