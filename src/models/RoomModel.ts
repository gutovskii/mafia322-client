export interface RoomModel {
  id: string;
  name: string;
  roles: string[];
  players: string[];
  status: RoomStatus;
  dayTimeSec: number;
  firstDayTimeSec: number;
  maxPlayers: number;
  minPlayers: number;
  isPrivate: boolean;
  playersCount: number;
}

export enum RoomStatus {
  WAITING = "WAITING",
  PLAYING = "PLAYING",
}
