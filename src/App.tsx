import { AddFightButton } from "./components/AddFight";
import { FightResult } from "./components/FightResult";
import { TopBar } from "./components/Topbar";
import "./styles.css";

function App() {
  return (
    <>
      {/* <header>MK-Dashboard</header> */}
      <TopBar />
      <main>
        <FightResult />
        <FightResult />
        <FightResult />
      </main>
      <AddFightButton />
    </>
  );
}

export default App;
