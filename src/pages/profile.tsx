import { useContext } from "react";
import { AddRival } from "../components/AddRival";
import { QuickInfo } from "../components/QuickInfo";
import { RivalQuickInfo } from "../components/RivalQuickInfo";
import "./styles.css";
import { AppContext } from "../context";

export function ProfilePage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }
  const { profileData } = context;

  return (
    <>
      <QuickInfo />
      <AddRival />
      <section className="profile__rivalsList">
        {profileData.rivals.map((rival, index) => {
          return (
            <RivalQuickInfo
              key={index}
              name={rival.nickname}
              image={rival.image}
            />
          );
        })}
      </section>
      Hello world from /profile
    </>
  );
}
