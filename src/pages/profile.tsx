import { useContext, useState } from "react";
import { AddRival } from "../components/AddRival";
import { QuickInfo } from "../components/QuickInfo";
import { RivalQuickInfo } from "../components/RivalQuickInfo";
import "./styles.css";
import { AppContext } from "../context";
import { Modal } from "../components/Modal";
import { RivalForm } from "../components/RivalForm";

export function ProfilePage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }
  const { profileData } = context;

  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <QuickInfo />
      <AddRival setOpenModal={setOpenModal} />
      {openModal && (
        <Modal>
          <RivalForm setOpenModal={setOpenModal} />
        </Modal>
      )}
      <section className="profile__rivalsList">
        {profileData.rivals.map((rival, index) => {
          return (
            <RivalQuickInfo
              key={index}
              rivalIndex={index}
              name={rival.nickname}
              image={rival.image}
            />
          );
        })}
      </section>
    </>
  );
}
