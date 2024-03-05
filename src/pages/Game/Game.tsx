import { Modal, notification } from "antd";
import { useEffect } from "react";
import { socket } from "../../socket";
import { useGlobalStore } from "../../store/globalStore";
import "./Game.scss";

export const Game: React.FC = () => {
  const [globalState] = useGlobalStore();

  const [createNotification, contextHolder] = notification.useNotification();

  useEffect(() => {
    socket.on("player:get-role", (data: { roleName: string }) => {
      Modal.info({
        title: `You are a ${data.roleName}`,
      });
    });
    if (globalState.chosenRoom.firstDayTimeSec) {
      console.log("ON GAME:START_FIRST_DAY");
      socket.on("game:start-first-day", () => {
        console.log("activated game:start-first-day");
        createNotification.info({ message: "Починаємо знайомство!" });
      });
    }
    socket.on("game:start-night", () => {
      console.log("activated ON GAME:START_NIGHT");
      createNotification.info({ message: "Настала ніч!" });
    });
    return () => {
      socket
        .off("player:get-role")
        .off("game:start-first-day")
        .off("game:start-night");
    };
  }, []);

  return <div>{contextHolder}</div>;
};
