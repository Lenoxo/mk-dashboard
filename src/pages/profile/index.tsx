import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { QuickInfo } from "../../components/QuickInfo";
import { AddRival } from "../../components/AddRival";
import { Modal } from "../../components/Modal";
import { RivalForm } from "../../components/RivalForm";
import { RivalQuickInfo } from "../../components/RivalQuickInfo";
import "./styles.css";
import { Rival } from "../../types";

export function ProfilePage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }
  const { profileData, historyEntries, setProfileData, setHistoryEntries } =
    context;

  const [openModal, setOpenModal] = useState<boolean>(false);

  function handleRivalDelete(rivalId: Rival["id"]) {
    const updatedHistoryEntries = { ...historyEntries };

    for (
      let index = 0;
      index < Object.values(updatedHistoryEntries).length;
      index++
    ) {
      let dayFightsArray = Object.values(updatedHistoryEntries)[index];
      let date = "";
      const filteredFights = dayFightsArray.filter((entry) => {
        date = entry.date;
        return entry.rivalId !== rivalId;
      });
      
      console.warn(filteredFights)

      dayFightsArray = filteredFights;

      if (dayFightsArray.length === 0) {
        delete updatedHistoryEntries[date];
      }
    }

    setHistoryEntries(updatedHistoryEntries);

    // const updatedProfileData = { ...profileData };
    // const rivals = updatedProfileData.rivals;
    // const rivalIndex = rivals.findIndex((rival) => rival.id === rivalId);

    // rivals.splice(rivalIndex, 1);

    // setProfileData(updatedProfileData);
  }
  
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
              deleteRival={handleRivalDelete}
            />
          );
        })}
      </section>
    </>
  );
}
