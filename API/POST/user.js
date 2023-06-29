import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;

// Login user
export const userLogin = async (userLog) => {
    const { data } = await axios.post(
      `${URL_API}/user/login`,
      userLog,
      { withCredentials: true }
    );
    return data;
  };

// Forgot password (envoi du mail pour changer le mot de passe)
export const forgotPassword = async (mail) => {
  const { data } = await axios.post(`${URL_API}/user/forgotpassword`, { mail })
  return data
}