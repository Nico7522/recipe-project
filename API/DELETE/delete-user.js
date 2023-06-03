import axios from "axios";

export const removeUser = (id) => {
  return axios.delete(`http://localhost:8080/api/user/${id}`);
};
