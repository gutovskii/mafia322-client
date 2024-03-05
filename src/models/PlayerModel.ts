import { RoleModel } from "./RoleModel";
import { RoomModel } from "./RoomModel";

export interface PlayerModel {
  id: string;
  name: string;
  isAdmin: boolean;
  role?: RoleModel;
  roleId?: string;
  room?: RoomModel;
  roomId?: string;
}
