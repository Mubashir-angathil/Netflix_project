import axios from "axios";
import { configs } from "../../utils/configs/Configs";

// Create an instance for axios
const instance = axios.create({ baseURL: configs.baseUrl });

// Request interceptor
instance.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    config.params = {
      api_key: configs.apiKey,
      ...config.params,
    };
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error)
);

export default instance;
