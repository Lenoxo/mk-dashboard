import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { QuickInfo } from "../../components/QuickInfo";
import { AddRival } from "../../components/AddRival";
import { Modal } from "../../components/Modal";
import { RivalForm } from "../../components/RivalForm";
import { RivalQuickInfo } from "../../components/RivalQuickInfo";
import "./styles.css";

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
              rivalId={rival.id}
              name={rival.nickname}
              image={rival.image}
            />
          );
        })}
      </section>
    </>
  );
}
