import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { PlayerModel } from "../../models/PlayerModel";
import { socket } from "../../socket";
import { useGlobalStore } from "../../store/globalStore";

interface EnterRoomModalProps {
  isOpened: boolean;
  onCancel: () => void;
}

export type EnterRoomData = { playerName: string; accessCode?: string };

export const EnterRoomModal: React.FC<EnterRoomModalProps> = ({
  isOpened,
  onCancel,
}) => {
  const [globalState] = useGlobalStore();
  const navigate = useNavigate();
  const [enterRoomForm] = Form.useForm<EnterRoomData>();

  return (
    <Modal
      open={isOpened}
      title="Уведіть код"
      okText="Увійти"
      cancelText="Закрити"
      onCancel={() => {
        enterRoomForm.resetFields();
        onCancel();
      }}
      onOk={() => {
        enterRoomForm
          .validateFields()
          .then((enterRoomData) => {
            socket.emit(
              "room:join",
              {
                playerName: enterRoomData.playerName,
                accessCode: enterRoomData.accessCode,
                roomId: globalState.chosenRoom.id,
              },
              ({ id, name, isAdmin }: PlayerModel) => {
                const cookies = new Cookies();
                console.log("Cookies", cookies.getAll()); // TODO
                cookies.set("playerId", id, {
                  httpOnly: true,
                });
                globalState.player = { id, name, isAdmin };
                navigate("/waiting-room");
                onCancel();
              }
            );
          })
          .catch(() => console.log("Validation failed"));
      }}
    >
      <Form form={enterRoomForm}>
        <Form.Item
          name={"playerName"}
          label={"Ім'я гравця"}
          rules={[{ required: true, message: "Заповни поле" }]}
        >
          <Input autoFocus />
        </Form.Item>
        {globalState.chosenRoom.isPrivate && (
          <Form.Item
            name={"accessCode"}
            label={"Код"}
            rules={[{ required: true, message: "Заповни поле" }]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
