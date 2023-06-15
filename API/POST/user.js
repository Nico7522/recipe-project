import axios from "axios";

// Login user
export const userLogin = async (userLog) => {
    const { data } = await axios.post(
      "http://localhost:8080/api/user/login",
      userLog
    );
    return data;
  };

// Forgot password (envoi du mail pour changer le mot de passe)
export const forgotPassword = async (mail) => {
  const { data } = await axios.post("http://localhost:8080/api/user/forgotpassword", { mail })
  return data
}