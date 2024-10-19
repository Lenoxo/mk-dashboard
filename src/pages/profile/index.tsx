import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { QuickInfo } from "../../components/QuickInfo";
import { AddRival } from "../../components/AddRival";
import { Modal } from "../../components/Modal";
import { RivalForm } from "../../components/RivalForm";
import { RivalQuickInfo } from "../../components/RivalQuickInfo";
import "./styles.css";
import { Rival } from "../../types";
import { currentDate } from "../../utils";
import { NewUserGuide } from "../../components/NewUserGuide";

export function ProfilePage() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext should be used inside an AppProvider");
  }
  const {
    profileData,
    historyEntries,
    setProfileData,
    setHistoryEntries,
    setCurrentDayFights,
  } = context;

  const [openModal, setOpenModal] = useState<boolean>(false);

  function handleRivalDelete(rivalId: Rival["id"]) {
    if (!profileData) {
      throw new Error("profileData is null when trying to delete a rival");
    }
    const updatedHistoryEntries = { ...historyEntries };

    for (const date in updatedHistoryEntries) {
      const filteredFights = updatedHistoryEntries[date].filter((entry) => {
        return entry.rivalId !== rivalId;
      });

      if (filteredFights.length === 0) {
        delete updatedHistoryEntries[date];
      } else {
        updatedHistoryEntries[date] = filteredFights;
      }

      if (date !== currentDate) {
        continue;
      }

      setCurrentDayFights(updatedHistoryEntries[date]);
    }

    setHistoryEntries(updatedHistoryEntries);

    const rivals = Array.from(profileData.rivals);
    const rivalIndex = rivals.findIndex((rival) => rival.id === rivalId);
    rivals.splice(rivalIndex, 1);

    setProfileData({
      ...profileData,
      rivals,
    });
  }

  return (
    <>
      {!profileData ? (
        <NewUserGuide />
      ) : (
        <>
          <QuickInfo />
          <AddRival setOpenModal={setOpenModal} />
        </>
      )}
      {openModal && (
        <Modal>
          <RivalForm setOpenModal={setOpenModal} />
        </Modal>
      )}
      <section className="profile__rivalsList">
        {profileData?.rivals.map((rival, index) => {
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
