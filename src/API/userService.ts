import axios from "@/middlewares/axios";

//types
import {
  TDepositData,
  TEditProfileData,
  TGetTransactionsParams,
  TLoginData,
  TRegisterData,
  TTransferToBalanceData,
} from "@/@types/user";
import { ImageTypes } from "@/@types/enums";

export const registerUser = async (body: TRegisterData) => {
  await axios.post("/users/register", body);
};

export const loginUser = async (body: TLoginData) => {
  const { data } = await axios.post("/users/login", body);
  return data;
};

export const confirmEmail = async (code: string) => {
  await axios.post("/users/confirm-email", { code });
};

export const logoutUser = async () => {
  await axios.post("/users/logout");
};

export const getUser = async () => {
  const { data } = await axios.get("/users/get");
  return data;
};

export const getProfile = async (username: string) => {
  const { data } = await axios.get("/users/get-profile", { params: { username } });
  return data;
};

export const deposit = async (body: TDepositData) => {
  const { data } = await axios.post("/users/top-up-balance", body);
  return data;
};

export const editProfile = async (body: TEditProfileData) => {
  const { data } = await axios.patch("/users/edit-profile", body);
  return data;
};

export const resetPasswordRequest = async (email: string) => {
  const { data } = await axios.post("/users/reset-password-request", { email });
  return data;
};

export const resetPasswordEnterCode = async (code: string) => {
  const { data } = await axios.post("/users/reset-password-enter-code", { code });
  return data;
};

export const resetPassword = async (password: string) => {
  const { data } = await axios.post("/users/reset-password", { password });
  return data;
};

export const uploadPhoto = async (photo: File, type: ImageTypes) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("type", type);

  const { data } = await axios.post("/users/upload-photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deletePhoto = async (type: ImageTypes) => {
  await axios.delete("/users/delete-photo", { params: { type } });
};

export const getBalanceTransactions = async (params: TGetTransactionsParams) => {
  const { data } = await axios.get("/users/get-balance-transactions", { params });
  return data;
};

export const getReferralBalance = async () => {
  const { data } = await axios.get("/users/get-referral-balance");
  return data;
};

export const transferToBalance = async (body: TTransferToBalanceData) => {
  await axios.post("/users/transfer-to-balance", body);
};

export const becomeSeller = async (accept: boolean) => {
  await axios.post("/users/become-seller", { accept_offer: accept });
};

