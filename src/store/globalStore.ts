import { Action, createHook, createStore } from "react-sweet-state";
import { PlayerModel } from "../models/PlayerModel";
import { RoomModel, RoomStatus } from "../models/RoomModel";

const initialState: State = {
  player: { id: "", name: "", isAdmin: false },
  chosenRoom: {
    id: "",
    name: "",
    isPrivate: false,
    dayTimeSec: 0,
    firstDayTimeSec: 0,
    maxPlayers: 0,
    minPlayers: 0,
    players: [],
    playersCount: 0,
    roles: [],
    status: RoomStatus.WAITING,
  },
};

type State = {
  player: PlayerModel;
  chosenRoom: RoomModel;
};

type Actions = typeof actions;

const actions = {
  setPlayer:
    (player: PlayerModel): Action<State> =>
    ({ setState }) => {
      setState({ player });
    },
  setChosenRoom:
    (room: RoomModel): Action<State> =>
    ({ setState }) => {
      setState({ chosenRoom: room });
    },
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
});

export const useGlobalStore = createHook(Store);
