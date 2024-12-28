import { TProductPrice } from "@/redux/slices/products/types";
import { TPaginationParams } from "./base";
import { PaymentTypes, ProductTypes, TransactionStatuses, Units } from "./enums";

export type TGetProductsParams = {
  tags?: string;
  category?: string;
  type: ProductTypes;
};

export type TGetPurchasesParams = TPaginationParams & {
  type?: ProductTypes;
  statuses?: string;
  category?: string;
};

export type TGetTagsParams = {
  type: ProductTypes;
};

export type TGetProductReviewsParams = TPaginationParams & {
  product_id: number;
};

export type TPurchaseItemData = {
  id?: number;
  quantity?: number;
  options?: TProductPurchaseOptions;
};

export type TMakePurchaseData = TPurchaseItemData & {
  payment_type: PaymentTypes;
  products?: TPurchaseItemData[];
};

export interface IProductPurchases {
  products: TProductPurchaseItem[];
  total_pages: number;
}

export type TProductPurchaseItem = {
  purchase: {
    id: number;
    datetime: string;
    status: TransactionStatuses;
    country: string;
    quantity: {
      all: number;
      left: number;
      is_static: boolean;
      unit: Units;
    };
  };
  seller: TSellerInfo;
  product: {
    id: number;
    title: string;
    category?: string;
    category_id: number;
    type: ProductTypes;
    expiration_date: string;
  };
};

export type TProductPurchaseOptions = Partial<{
  country?: string;
}>;

export type TUpdateCartData = {
  product_id: number;
  amount: number;
  options?: TProductPurchaseOptions;
  operation: "+" | "-" | "=";
};

export type TGetUpdateCartData = TUpdateCartData & {
  inCart: number;
};

export type TSellerInfo = {
  name: string;
  id: number;
  is_verified: boolean;
};

export interface IProductReviews {
  reviews: TProductReview[];
  total_pages: number;
  seller_rating: number;
  reviews_count: number;
}

export type TProductReview = {
  rating: number;
  text: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
};

export type TAddProductReviewData = {
  id: number;
  text: string;
  rating: number;
};

export type TCreateProduct = {
  title: string;
  short_description: string;
  description: string;
  prices: TProductPrice[];
  in_stock: number;
  type: string;
  category: string;
  tags: number[];
};
