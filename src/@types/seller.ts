//types
import { TProductPrice, TProductTag } from "@/redux/slices/products/types";
import { TPaginationParams } from "./base";
import { ProductTypes } from "./enums";

export type TGetSalesParams = TPaginationParams & {
  provided?: boolean;
};

export type TGetMyProductsParams = TPaginationParams & {
  type?: ProductTypes;
};

export type TGetSellerReviewsParams = TPaginationParams & {
  id: number;
}

export type TSellerBalance = {
  available_amount: number;
  credited_amount: number;
  withdrawn_amount: number;
  total_amount: number;
  hold_amount: number;
  total_sales: number;
};

export interface ISellerProducts {
  is_verified: boolean;
  products: TSellerProduct[];
  total_pages: number;
}

export type TSellerProduct = {
  id: number;
  title: string;
  sold: number;
  total_profit: number;
  in_stock: number;
  photo: string;
  description: string;
  short_description: string;
  prices: TProductPrice[];
  tags: TProductTag[];
  rating: number;
  category: {
    id: number;
    title: string;
  };
};

export interface ISellHistory {
  sales: TSellHistoryItem[];
  total_pages: number;
}

export type TSellHistoryItem = {
  purchase: {
    id: number;
    dt: string;
    amount: number;
    quantity: number;
    buyer_message: string;
    provided: boolean;
  };
  product: {
    id: number;
    type: string;
    title: string;
  }
  buyer: {
    id: number;
    name: string;
  };
};
