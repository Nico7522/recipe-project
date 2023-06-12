import axios from "axios";

// Get all users
export const fetchUser = async () => {
  const { data } = await axios.get("http://localhost:8080/api/user");
  return data.results;
};

// Get user by ID
export const fetchUserById = async (logedUserId) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/user/${logedUserId}`
  );
  return data.result;
};
