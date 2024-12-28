import { Status } from "@/@types/base";
import { ProductTypes, Units } from "@/@types/enums";
import { TSellerInfo } from "@/@types/products";

export interface IProductsInitialState {
  products: TProductsByCategory | null;
  status: Status;
}

export type TProductsByCategory = Record<string, TProduct[]>;

export type TProduct = {
  id: number;
  category: string;
  prices: TProductPrice[];
  type: ProductTypes;
  description: string;
  rating: number;
  short_description: string;
  seller_info: TSellerInfo;
  photo: string;
  in_stock: number;
  sold: number;
  unit: Units;
  tags: TProductTag[];
  review_access: boolean;
  title: string;
  other_offers: TProductOtherSellers;
  other_sellers: number;
  other_sellers_avatars: string[];
};

export type TProductOtherSellers = {
  min_price: number,
  offers: TProductOtherSellersOffer[];
}

export type TProductOtherSellersOffer = {
  seller_info: TSellerInfo,
  product: {
    id: number,
    short_description: string,
    in_stock: number;
    title: string,
    price: number;
    photo: string;
    type: ProductTypes;
  }
}

export type TProductPrice = {
  amount: string;
  price: number;
};

export type TProductTag = {
  id: number;
  name: string;
};
