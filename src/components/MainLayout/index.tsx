import { ReactNode, useState } from "react";
import { Navbar } from "../Navbar";

export function MainLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  console.info(isMenuOpen);
  return (
    <>
      <header>
        Hello there, this is the header.
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Click to toggle
        </button>
      </header>
      <Navbar open={isMenuOpen} setOpen={setIsMenuOpen} />
      {children}
    </>
  );
}
