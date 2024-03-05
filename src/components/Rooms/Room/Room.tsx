import { LockOutlined, TeamOutlined } from "@ant-design/icons";
import { List, Skeleton } from "antd";
import { RoomModel, RoomStatus } from "../../../models/RoomModel";
import { useGlobalStore } from "../../../store/globalStore";

interface RoomProps {
  room: RoomModel;
  openEnterRoomModal: (() => void) | null;
}
// dima gay
export const Room: React.FC<RoomProps> = ({ room, openEnterRoomModal }) => {
  const [_, globalActions] = useGlobalStore();

  const enterRoom = () => {
    console.log("ENTER ROOM", room);
    globalActions.setChosenRoom(room);
    openEnterRoomModal!();
  };

  return (
    <List.Item
      actions={[
        room.status === RoomStatus.WAITING ? (
          <a onClick={enterRoom}>Увійти</a>
        ) : undefined,
      ]}
    >
      <Skeleton loading={false} active>
        {" "}
        {/* state.loading'1 */}
        <List.Item.Meta
          title={
            <>
              <strong>{room.name}</strong> {room.isPrivate && <LockOutlined />}
            </>
          }
        />
        <div className="room-stats">Min: {room.minPlayers}</div>
        <div className="room-stats">Max: {room.maxPlayers}</div>
      </Skeleton>
      <div className="room-stats">
        <TeamOutlined /> {room.playersCount}
      </div>
    </List.Item>
  );
};
