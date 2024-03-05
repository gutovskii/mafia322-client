import { RoleModel } from "./RoleModel";

export interface RoleStatsModel {
  id: string;
  roleName: string;
  role: RoleModel;
  roomId: string;
}
