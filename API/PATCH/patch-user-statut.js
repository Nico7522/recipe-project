import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;

export const updateUserStatut = ({ id, statusChange }) => {
  return axios.patch(`${URL_API}/user/${id}`, {
    status: statusChange,
  });
};

export const updatePassword = ({ mail, password, config }) => {
  return axios.patch(
    `${URL_API}/user/resetpassword`,
    {
      mail: mail,
      password: password,
    },
    // config
  );
};
