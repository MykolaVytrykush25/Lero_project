import axios from "@/middlewares/axios";

//types
import { TGetMyProductsParams, TGetSalesParams, TGetSellerReviewsParams } from "@/@types/seller";

export const getSalesHistory = async (params: TGetSalesParams) => {
  const { data } = await axios.get("/seller/get-sales", { params });
  return data;
};

export const getSellerBalance = async () => {
  const { data } = await axios.get("/seller/get-balance");
  return data;
};

export const getMyProducts = async (params: TGetMyProductsParams) => {
  const { data } = await axios.get("/seller/get-my-products", { params });
  return data;
};

export const getSellerReviews = async (params: TGetSellerReviewsParams) => {
  const { data } = await axios.get("/seller/get-reviews", { params });
  return data;
}

export const getSellerOffers = async (params: TGetSellerReviewsParams) => {
  const { data } = await axios.get("/seller/get-products", { params });
  return data;
}

