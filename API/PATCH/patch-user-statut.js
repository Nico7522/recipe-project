import axios from "axios";

export const updateUserStatut = ({ id, statusChange }) => {
  return axios.patch(`http://localhost:8080/api/user/${id}`, {
    status: statusChange,
  });
};

export const updatePassword = ({ userId, password, config }) => {
  return axios.patch(
    `http://localhost:8080/api/user/${userId}/resetpassword`,
    {
      password: password,
    },
    config
  );
};
