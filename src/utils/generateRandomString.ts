import sampleSize from "lodash.samplesize";

const generateRandomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return sampleSize(chars, length).join("");
};

export default generateRandomString;
