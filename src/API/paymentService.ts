import { TSetInvoiceData } from "@/@types/payment";
import axios from "@/middlewares/axios";

export const getCryptoPaymentMethods = async () => {
  const { data } = await axios.get("/payment/get-crypto-methods");
  return data;
};

export const getInvoice = async (uuid: string) => {
  const { data } = await axios.get("/payment/get-invoice", { params: { uuid } });
  return data;
};

export const setInvoice = async (body: TSetInvoiceData) => {
  const { data } = await axios.patch("/payment/set-invoice", body);
  return data;
};
