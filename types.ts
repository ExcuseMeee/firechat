export type Firebase_Msg = {
  senderId: string; // auth uid
  payload: string[];
  timestamp: number;
}

export type Profile = {
  username: string;
  isAnon: boolean;
}

export type Msg = {
  payload: string[];
  timestamp: number;
  username: string;
}