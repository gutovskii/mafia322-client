import { Button, Modal, notification } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlayersList } from "../../components/PlayersList/PlayersList";
import { socket } from "../../socket";
import { useGlobalStore } from "../../store/globalStore";
import { useWaitingRoomStore } from "../../store/waitingRoomStore";
import "./WaitingRoom.scss";

export const WaintingRoom: React.FC = () => {
  const [globalState] = useGlobalStore();
  const [waitingRoomState, waitingRoomActions] = useWaitingRoomStore();

  const navigate = useNavigate();
  const [createNotification, contextHolder] = notification.useNotification();

  const leave = () => {
    socket.off("notificate:player-joined");
    socket.off("notificate:player-left");
    socket.off("notificate:admin-left");
    socket.off("room:start");
    socket.emit("room:leave", {
      playerId: globalState.player.id,
      playerName: globalState.player.name,
      isPlayerAdmin: globalState.player.isAdmin,
      roomId: globalState.chosenRoom.id,
    });
    navigate("/");
  };

  const startGame = () => {
    console.log("START GAME", globalState.chosenRoom);
    socket.emit("room:start", globalState.chosenRoom.id, () => {
      socket.emit("game:start", globalState.chosenRoom.id);
    });
  };

  useEffect(() => {
    waitingRoomActions.findPlayers(globalState.chosenRoom.id);
    socket.on("notificate:player-joined", (data: { newPlayerName: string }) => {
      waitingRoomActions.addPlayerName(data.newPlayerName);
      createNotification.info({
        message: `${data.newPlayerName} приєднав(-ла)ся`,
        placement: "topRight",
        duration: 2,
      });
    });
    socket.on("notificate:admin-left", () => {
      Modal.info({
        title: "Адмін покинув кімнату",
        onOk: () => leave(),
        onCancel: () => leave(),
      });
    });
    socket.on("notificate:player-left", (data: { leftPlayerName: string }) => {
      waitingRoomActions.removePlayerName(data.leftPlayerName);
      createNotification.warning({
        message: `${data.leftPlayerName} покинув(-ла) кімнату`,
        placement: "topRight",
        duration: 2,
      });
    });
    socket.on("room:start", () => {
      navigate("/game");
    });
  }, []);

  return (
    <div className="waiting-room">
      {contextHolder}
      <div className="waiting-room-info">
        <p>
          Кімната: <strong>{globalState.chosenRoom.name}</strong>
        </p>
        <p>
          Ваше ім'я: <strong>{globalState.player.name}</strong>
        </p>
        <p>
          Учасників: <strong>{waitingRoomState.playerNames.length}</strong>
        </p>
      </div>
      <PlayersList />
      <div className="waiting-room-btns">
        <Button onClick={leave}>Вийти</Button>
        {globalState.player.isAdmin && (
          <Button
            onClick={startGame}
            disabled={
              globalState.chosenRoom.minPlayers >
              waitingRoomState.playerNames.length
            }
          >
            Почати гру
          </Button>
        )}
      </div>
    </div>
  );
};
