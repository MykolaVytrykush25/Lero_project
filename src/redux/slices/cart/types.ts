import { Status } from "@/@types/base";
import { ProductTypes } from "@/@types/enums";
import { TProductPurchaseOptions, TSellerInfo } from "@/@types/products";
import { TProductPrice } from "../products/types";

export interface ICartInitialState {
  items: TCartItem[];
  count: number;
  isCartLoaded: boolean;
  total: number;
  status: Status;
}

export type TCartItem = {
  product: {
    id: number;
    title: string;
    type: ProductTypes;
    description: string;
    prices: TProductPrice[];
    photo: string;
    options?: TProductPurchaseOptions;
  };
  amount: number;
  seller_info: TSellerInfo;
};
