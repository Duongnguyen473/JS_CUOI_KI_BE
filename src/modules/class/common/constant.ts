import { Class } from "../entities/class.entity";

export enum ClassStatus {
  OPEN = 'OPEN',
  FULL = 'FULL',
  CLOSED = 'CLOSED',
}

export enum ClassMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}


export interface ManagerClass extends Class {
  enrollment: number;
  totalBid: number;
  peddingBid: number;
}