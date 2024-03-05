export interface RoleModel {
  name: string;
  roleKindness: RoleKindness;
  isActive: boolean;
}

export enum RoleKindness {
  TOWN_ALIGNED = "TOWN_ALIGNED",
  MAFIA_ALIGNED = "MAFIA_ALIGNED",
  THIRD_PARTY = "THIRD_PARTY",
  MANIAC = "MANIAC",
}
