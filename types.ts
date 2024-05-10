/** document shape from the `messages` collection */
export type Firebase_Msg = {
  senderId: string; // auth uid
  payload: string[];
  timestamp: number;
};

/** document shape from the `profiles` collection */
export type Profile = {
  username: string;
  isAnon: boolean;
};

/** document shape from the `deleted_profiles` collection */
export type DeletedProfile = {
  username: string;
  isAnon: boolean;
  deletedOn: number;
};

export type Msg = {
  payload: string[];
  timestamp: number;
  username: string;
};
