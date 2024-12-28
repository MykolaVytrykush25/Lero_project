import { Status } from "@/@types/base";
import { UserRoles } from "@/@types/enums";

export interface IUserSliceInitialState {
  userData: TUser | null;
  isAuthenticated: boolean;
  userFetched: boolean;
  status: Status;
}

export type TUser = {
  email: string;
  username: string;
  role: UserRoles;
  balance: number;
  description: string;
  avatar: string | null;
  banner: string | null;
  referral_link: string;
  id: number;
};
