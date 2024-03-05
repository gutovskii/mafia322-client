import { Action, createHook, createStore } from "react-sweet-state";
import { RoomModel } from "../models/RoomModel";
import { roomService } from "../services/roomService";
import { SearchFormValues } from "../components/SearchForm/SearchForm";

const initialState: State = {
  loading: false,
  rooms: [],
  totalPages: 0,
  currentPage: 0,
  itemsPerPage: 0,
  totalItems: 0,
  search: "",
  allStatuses: false,
  isCreateRoomModalOpened: false,
};

type State = {
  loading: boolean;
  rooms: RoomModel[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  search: string;
  allStatuses: boolean;
  isCreateRoomModalOpened: boolean;
};

type Actions = typeof actions;

const actions = {
  findRooms:
    (values: SearchFormValues, page = 1, limit = 2): Action<State> =>
    async ({ setState }) => {
      setState({ loading: true });
      const roomsData = await roomService.find(values, page, limit);
      setState({
        loading: false,
        rooms: roomsData.items,
        totalPages: roomsData.meta.totalPages,
        itemsPerPage: roomsData.meta.itemsPerPage,
        currentPage: roomsData.meta.currentPage,
        totalItems: roomsData.meta.totalItems,
      });
    },
  setSearch:
    (search: string): Action<State> =>
    async ({ setState }) => {
      setState({ search });
    },
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
});

export const useGameMenuStore = createHook(Store);
