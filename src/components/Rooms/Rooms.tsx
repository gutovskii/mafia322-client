import { Button, List, Pagination, PaginationProps } from "antd";
import { useEffect } from "react";
import { useGameMenuStore } from "../../store/gameMenuStore";
import { CreateRoomModal } from "../CreateRoomModal/CreateRoomModal";
import { useCreateRoomModal } from "../CreateRoomModal/useCreateRoomModal";
import { EnterRoomModal } from "../EnterRoomModal/EnterRoomModal";
import { useEnterRoomModal } from "../EnterRoomModal/useEnterRoomModal";
import { Room } from "./Room/Room";
import "./Rooms.scss";

export const ITEMS_LIMIT = 3;

export const Rooms: React.FC = () => {
  const [state, actions] = useGameMenuStore();
  const {
    isCreateRoomModalOpened,
    openCreateRoomModal,
    cancelCreateRoomModal,
  } = useCreateRoomModal();
  const { isEnterRoomModalOpened, cancelEnterRoomModal, openEnterRoomModal } =
    useEnterRoomModal();

  const onPaginationChange: PaginationProps["onChange"] = (page) => {
    actions.findRooms(
      { search: state.search, allStatuses: state.allStatuses },
      page,
      ITEMS_LIMIT
    );
  };

  useEffect(() => {
    actions.findRooms(
      { search: state.search, allStatuses: state.allStatuses },
      1,
      ITEMS_LIMIT
    );
  }, []);

  return (
    <>
      <CreateRoomModal
        isOpened={isCreateRoomModalOpened}
        onCancel={cancelCreateRoomModal}
      />
      <EnterRoomModal
        isOpened={isEnterRoomModalOpened}
        onCancel={cancelEnterRoomModal}
      />
      <div className="rooms">
        <List
          className="rooms-list"
          // loading={state.loading}
          itemLayout="horizontal"
          dataSource={state.rooms}
          renderItem={(room) => (
            <Room room={room} openEnterRoomModal={openEnterRoomModal} />
          )}
        />
        <Pagination
          className="room-pagination"
          current={state.currentPage}
          total={state.totalItems}
          onChange={onPaginationChange}
          pageSize={ITEMS_LIMIT}
        />
        <div className="rooms-create">
          <Button onClick={openCreateRoomModal}>Створити кімнату</Button>
        </div>
      </div>
    </>
  );
};
