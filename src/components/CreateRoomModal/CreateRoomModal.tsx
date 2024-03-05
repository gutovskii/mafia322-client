import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerModel } from "../../models/PlayerModel";
import { RoleModel } from "../../models/RoleModel";
import { RoomModel } from "../../models/RoomModel";
import { roleService } from "../../services/roleService";
import { socket } from "../../socket";
import { useGlobalStore } from "../../store/globalStore";
import "./СreateRoomModal.scss";

interface CreateRoomModalProps {
  isOpened: boolean;
  onCancel: () => void;
}

export type CreateRoomData = Pick<
  RoomModel,
  "name" | "minPlayers" | "maxPlayers" | "dayTimeSec" | "firstDayTimeSec"
> & { playerName: string; roles: { roleId: number }[]; accessCode?: string };

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpened,
  onCancel,
}) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [globalState, globalActions] = useGlobalStore();

  const [createRoomForm] = Form.useForm<CreateRoomData>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpened) {
      roleService.find(true).then((res) => setRoles(res.data));
    }
  }, [isOpened]);

  return (
    <Modal
      open={isOpened}
      title="Створити кімнату"
      okText="Створити"
      cancelText="Закрити"
      onCancel={onCancel}
      onOk={() => {
        createRoomForm
          .validateFields()
          .then(async (createRoomData) => {
            console.log(createRoomData);
            createRoomForm.resetFields();
            socket.emit(
              "room:create",
              createRoomData,
              ({
                createdRoom,
                adminPlayer,
              }: {
                createdRoom: RoomModel;
                adminPlayer: PlayerModel;
              }) => {
                globalActions.setChosenRoom(createdRoom);
                globalActions.setPlayer(adminPlayer);
                navigate("/waiting-room");
                onCancel();
              }
            );
          })
          .catch((info) => {
            console.log("Validation Failed: ", info);
          });
      }}
    >
      <Form
        form={createRoomForm}
        layout="vertical"
        className="create-room-modal"
      >
        <Form.Item
          initialValue={"ass"}
          name={"name"}
          label={"Назва"}
          rules={[
            { required: true, message: "Заповни поле" },
            { max: 50, message: "Зменши назву до 50 символів" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"playerName"}
          label={"Твій псевдонім"}
          rules={[
            { required: true, message: "Заповни поле" },
            { min: 3, message: "Псевдонім має бути від 3 символів" },
            { max: 30, message: "Зменши назву до 30 символів" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={3}
          name={"minPlayers"}
          label={"Мінімальна к-сть учасників"}
          rules={[
            { required: true, message: "Заповніть поле" },
            {
              type: "number",
              min: 3,
              message: "Кількість має бути більша-рівна трьом",
            },
            {
              type: "number",
              max: 20,
              message: "К-сть має бути менша-рівна двадцяти",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          initialValue={5}
          name={"maxPlayers"}
          label={"Максимальна к-сть учасників"}
          dependencies={["minPlayers"]}
          rules={[
            { required: true, message: "Заповніть поле" },
            {
              type: "number",
              min: 4,
              message: "К-cть має бути більша-рівна чотирьом",
            },
            {
              type: "number",
              max: 20,
              message: "К-сть має бути менша-рівна двадцяти",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value >= getFieldValue("minPlayers"))
                  return Promise.resolve();
                return Promise.reject(
                  new Error(
                    "Максимальна к-сть має бути більша-рівна мінімальній"
                  )
                );
              },
            }),
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.List name={"rolesStats"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restFields }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restFields}
                    name={[name, "roleName"]}
                    rules={[{ required: true, message: "Додай роль" }]}
                  >
                    <Select style={{ width: 100 }}>
                      {roles.map((role) => (
                        <Select.Option key={role.name} value={role.name}>
                          {role.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[name, "roleCount"]}
                    rules={[
                      {
                        type: "number",
                        min: 1,
                        message: "Менше однієї ролі бути не може",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Додати роль
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          initialValue={10}
          name={"dayTimeSec"}
          label={"Скільки часу триває день? (у секундах)"}
          rules={[
            { required: true, message: "Заповніть поле" },
            {
              type: "number",
              min: 10,
              message: "Мінімальний час - десять секунд",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={"firstDayTimeSec"}
          label={
            "Скільки триватиме перший день? (у секундах) Якщо не вказано, тоді не буде першого дня"
          }
          rules={[
            {
              type: "number",
              min: 10,
              message: "Мінімальний час - десять секунд",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Кімната приватна?"
          name={"isPrivate"}
          valuePropName="checked"
        >
          <Checkbox
            checked={isPrivate}
            onChange={() => {
              setIsPrivate(!isPrivate);
            }}
          />
        </Form.Item>
        {isPrivate && (
          <Form.Item
            label={"Код доступу"}
            name={"accessCode"}
            rules={[
              { required: isPrivate, message: "Заповни поле" },
              { min: 3, message: "Мінімум 3 символи" },
            ]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
