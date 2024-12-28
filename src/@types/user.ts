import { TProduct } from "@/redux/slices/products/types";
import { TPaginationParams } from "./base";
import { PaymentTypes, TransactionStatuses } from "./enums";

export type TRegisterData = {
  username: string;
  email: string;
  password: string;
  ref_code?: string;
};

export type TGetTransactionsParams = TPaginationParams & {
  statuses?: string;
};

export type TLoginData =
  | {
    email: string;
    password: string;
  }
  | {
    queryString: string;
    from: 'telegram';
  };

export type TEditProfileData = Partial<{
  email: string;
  password: string;
  old_password: string | null;
  username: string;
  description: string;
}>;

export type TProfileData = {
  id: number;
  username: string;
  avatar: string | null;
  banner: string | null;
  description: string;
  seller_info: {
    username: string,
    description: string,
    is_verified: boolean,
    seller_rating: number,
    total_sales: number
  }
};

export interface IBalanceTransactions {
  transactions: TBalanceTransaction[];
  total_pages: number;
}

export type TBalanceTransaction = {
  amount: number;
  status: TransactionStatuses;
  created_dt: string;
  payment_type: PaymentTypes;
  invoice: string;
};

export type TDepositData = {
  amount: string;
  payment_type: string;
};

export type TReferralInfo = {
  total: number;
  hold: number;
  credited: number;
  available: number;
  total_users: number;
};

export interface IUserProducts {
  products: TProduct[];
  total_pages: number;
}

export type TTransferToBalanceData = {
  amount: number;
  from: "referral" | "seller";
};
