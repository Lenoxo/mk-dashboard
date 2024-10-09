import { ReactNode, useState } from "react";
import { Navbar } from "../Navbar";
import "./styles.css";

export function MainLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <Navbar open={isMenuOpen} setOpen={setIsMenuOpen} />
      <div className={`appWrapper ${isMenuOpen && "appWrapper--move"}`}>
        <Header open={isMenuOpen} setOpen={setIsMenuOpen} />
        {children}
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
