import axios from "axios";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const useApi = () => {
  const { i18n } = useTranslation();
  const history = useHistory();

  const axiosAPI = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  axiosAPI.interceptors.request.use(
    async (config) => {
      config.headers.common["Content-Type"] = "application/json";
      config.headers.common["Accept-Language"] = i18n.language;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosAPI.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of
      // 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range
      // of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return { axiosAPI };
};
export { useApi };
