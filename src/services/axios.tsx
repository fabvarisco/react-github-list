import axios from "axios";

export const API_DEFAULT_PARAMS = {
  client_id: import.meta.env.VITE_CLIENT_ID,
};
export const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 1000,
});
