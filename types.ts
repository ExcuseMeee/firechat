export type Msg = {
  senderId: string; // auth uid
  payload: string[];
  timestamp: number;
}

export type Profile = {
  username: string;
  isAnon: boolean;
}