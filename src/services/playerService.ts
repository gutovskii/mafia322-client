import { PlayerModel } from "../models/PlayerModel";
import { axiosInstance } from "./axiosInstance";

export const playerService = {
  async findByRoomId(roomId: string) {
    return (
      await axiosInstance.get<PlayerModel[]>("/player", {
        params: {
          roomId,
        },
      })
    ).data;
  },
};
