import { QuickInfo } from "../components/QuickInfo";
import { RivalQuickInfo } from "../components/RivalQuickInfo";
import "./styles.css";

export function ProfilePage() {
  return (
    <>
      <QuickInfo />
      <section className="profile__rivalsList">
        <RivalQuickInfo />
        <RivalQuickInfo />
        <RivalQuickInfo />
        <RivalQuickInfo />
      </section>
      Hello world from /profile
    </>
  );
}
