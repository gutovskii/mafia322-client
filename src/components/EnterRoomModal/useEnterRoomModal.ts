import { useState } from "react";

export const useEnterRoomModal = () => {
  const [isEnterRoomModalOpened, setIsEnterRoomModalOpened] = useState(false);

  const openEnterRoomModal = () => setIsEnterRoomModalOpened(true);

  const cancelEnterRoomModal = () => setIsEnterRoomModalOpened(false);

  return {
    isEnterRoomModalOpened,
    openEnterRoomModal,
    cancelEnterRoomModal,
  };
};
