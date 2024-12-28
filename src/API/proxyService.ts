import axios from "@/middlewares/axios";

//types
import { TGetProxyGeoParams } from "@/@types/proxy";

export const getProxyInfo = async (id: string) => {
  const { data } = await axios.get("/proxy/get-info", { params: { id } });
  return data;
};

export const getProxyGeo = async (params: TGetProxyGeoParams) => {
  const { data } = await axios.get("/proxy/get-geo", { params });
  return data;
};
