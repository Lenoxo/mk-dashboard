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
    const updatedHistoryEntries = { ...historyEntries };

    // TODO: Refactor this to a context function or a easier to read one

    for (const date in updatedHistoryEntries) {
      if (Object.prototype.hasOwnProperty.call(updatedHistoryEntries, date)) {
        const filteredFights = updatedHistoryEntries[date].filter((entry) => {
          return entry.rivalId !== rivalId;
        });

        if (filteredFights.length === 0) {
          delete updatedHistoryEntries[date];
        } else {
          updatedHistoryEntries[date] = filteredFights;
        }
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
