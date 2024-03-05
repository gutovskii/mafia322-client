import { Action, createHook, createStore } from "react-sweet-state";
import { playerService } from "../services/playerService";

const initialState: State = {
  playerNames: [],
};

type State = {
  playerNames: string[];
};

type Actions = typeof actions;

const actions = {
  findPlayers:
    (roomId: string): Action<State> =>
    async ({ setState }) => {
      const players = await playerService.findByRoomId(roomId);
      setState({ playerNames: players.map((p) => p.name) });
    },
  addPlayerName:
    (newPlayerName: string): Action<State> =>
    ({ setState, getState }) => {
      setState({ playerNames: [...getState().playerNames, newPlayerName] });
    },
  removePlayerName:
    (leftPlayerName: string): Action<State> =>
    ({ setState, getState }) => {
      const updatedPlayers = getState().playerNames.filter(
        (name) => name !== leftPlayerName
      );
      setState({ playerNames: updatedPlayers });
    },
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
});

export const useWaitingRoomStore = createHook(Store);
