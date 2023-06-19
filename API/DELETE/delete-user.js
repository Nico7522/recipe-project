import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;

export const removeUser = (id) => {
  return axios.delete(`${URL_API}user/${id}`);
};
