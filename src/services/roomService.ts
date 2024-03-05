import { PaginationData } from "../common/pagination-data";
import { CreateRoomData } from "../components/CreateRoomModal/CreateRoomModal";
import { RoomModel } from "../models/RoomModel";
import { axiosInstance } from "./axiosInstance";
import { SearchFormValues } from "../components/SearchForm/SearchForm";

export const roomService = {
  async find(
    { search, allStatuses }: SearchFormValues,
    page: number,
    limit: number
  ) {
    const res = await axiosInstance.get<PaginationData<RoomModel>>("/room", {
      params: {
        search,
        allStatuses,
        page,
        limit,
      },
    });
    return res.data;
  },
  async findOne(id: string) {
    const res = await axiosInstance.get<RoomModel>(`room/${id}`);
    return res.data;
  },
  async create(roomData: CreateRoomData) {
    return (await axiosInstance.post<RoomModel>("/room", roomData)).data;
  },
};
