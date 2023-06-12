import axios from "axios";

// Login user
export const userLogin = async (userLog) => {
    const { data } = await axios.post(
      "http://localhost:8080/api/user/login",
      userLog
    );
    return data;
  };