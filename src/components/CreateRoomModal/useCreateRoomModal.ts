import { useState } from "react";

export const useCreateRoomModal = () => {
  const [isCreateRoomModalOpened, setIsCreateRoomModalOpened] =
    useState(false);

  const openCreateRoomModal = () => setIsCreateRoomModalOpened(true);
  const cancelCreateRoomModal = () => setIsCreateRoomModalOpened(false);

  return { isCreateRoomModalOpened, openCreateRoomModal, cancelCreateRoomModal}; 
};
