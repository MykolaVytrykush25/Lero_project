import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return Promise.reject(error);
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
