import { useContext } from "react";
import { AddRival } from "../components/AddRival";
import { QuickInfo } from "../components/QuickInfo";
import { RivalQuickInfo } from "../components/RivalQuickInfo";
import "./styles.css";
import { AppContext } from "../context";

export function ProfilePage() {
  const { profileData } = useContext(AppContext);
  return (
    <>
      <QuickInfo />
      <AddRival />
      <section className="profile__rivalsList">
        {profileData.rivals.map((rival) => {
          return <RivalQuickInfo name={rival.nickname} image={rival.image} />;
        })}
      </section>
      Hello world from /profile
    </>
  );
}
