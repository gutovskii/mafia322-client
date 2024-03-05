import { RoleModel } from "../models/RoleModel";
import { axiosInstance } from "./axiosInstance";

export const roleService = {
  find(withoutCitizen = false) {
    return axiosInstance.get<RoleModel[]>("/role", {
      params: {
        withoutCitizen
      }
    });
  },
};
