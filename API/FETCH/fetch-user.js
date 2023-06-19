import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;

// Get all users
export const fetchUser = async () => {
  const { data } = await axios.get(`${URL_API}/user`);
  return data.results;
};

// Get user by ID
export const fetchUserById = async (logedUserId) => {
  const { data } = await axios.get(
    `${URL_API}/user/${logedUserId}`
  );
  return data.result;
};
