import { List } from "antd";
import { useWaitingRoomStore } from "../../store/waitingRoomStore";
import "./PlayersList.scss";

export const PlayersList: React.FC = () => {
  const [waitingRoomState] = useWaitingRoomStore();

  return (
    <List
      className="players-list"
      itemLayout="horizontal"
      dataSource={waitingRoomState.playerNames}
      renderItem={(playerName) => <p>{playerName}</p>}
    ></List>
  );
};
