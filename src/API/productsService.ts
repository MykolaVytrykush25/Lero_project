import axios from "@/middlewares/axios";

//types
import {
  TUpdateCartData,
  TGetProductsParams,
  TGetPurchasesParams,
  TMakePurchaseData,
  TGetTagsParams,
  TGetProductReviewsParams,
  TAddProductReviewData,
  TCreateProduct,
} from "@/@types/products";

export const getProducts = async (params: TGetProductsParams) => {
  const { data } = await axios.get("/products/get-cards", { params });
  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await axios.get("/products/get", { params: { id } });
  return data;
};

export const getPurchases = async (params: TGetPurchasesParams) => {
  const { data } = await axios.get("/products/get-my", { params });
  return data;
};

export const getTags = async (params: TGetTagsParams) => {
  const { data } = await axios.get("/products/get-tags", { params });
  return data;
};

export const makePurchase = async (body: TMakePurchaseData) => {
  const { data } = await axios.post("/products/buy", body);
  return data;
};

export const updateCart = async (body: TUpdateCartData) => {
  const { data } = await axios.post("/products/add-to-cart", body);
  return data;
};

export const getCartProducts = async () => {
  const { data } = await axios.get("/products/get-cart");
  return data;
};

export const getProductReviews = async (params: TGetProductReviewsParams) => {
  const { data } = await axios.get("/products/get-reviews", { params });
  return data;
};

export const getProductRegions = async (id: number) => {
  const { data } = await axios.get("/products/get-countries", { params: { id } });
  return data;
};

export const addProductReview = async (body: TAddProductReviewData) => {
  await axios.post("/products/add-review", body);
};

export const getProductCategories = async (type: string) => {
  const { data } = await axios.get("/products/get-categories", { params: { type } });
  return data;
};

export const getProductTypes = async () => {
  const { data } = await axios.get("/products/get-types");
  return data;
};

export const createProduct = async (body: TCreateProduct) => {
  const { data } = await axios.post("/products/create", body);
  return data;
};

export const uploadProductPhoto = async (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("photo", photo);

  await axios.post("/products/upload-photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addProductData = async (file: File, id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("file", file);

  await axios.post("/products/add-data", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProductData = async (id: number) => {
  const { data } = await axios.get("/products/get-product-data", { params: { id } });
  return data;
};
