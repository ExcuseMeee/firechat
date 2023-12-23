import { FieldPath, FieldValue } from "firebase/firestore";

export type Msg = {
  senderId: string;
  payload: string;
  timestamp: number;
}