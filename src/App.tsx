import { Modal } from "antd";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Game } from "./pages/Game/Game";
import { GameMenu } from "./pages/GameMenu/GameMenu";
import { WaintingRoom } from "./pages/WaitingRoom/WaitingRoom";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("error", (error: { message: string }) => {
      Modal.error({
        title: "Помилка",
        content: <p>{error.message}</p>,
        closable: true,
      });
    });

    return () => {
      console.log("SOCKET DISCONNECT");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GameMenu />}></Route>
        <Route path="/waiting-room" element={<WaintingRoom />}></Route>
        <Route path="/game" element={<Game />}></Route>
        {/* eRROR WHEN game or waiting rroom ska */}
        <Route path="*" element={<Navigate to={"/"} replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
