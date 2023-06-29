import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;
export const createRecipe = async ({newRecipe, config}) => {
  axios.defaults.withCredentials = true;
  console.log(newRecipe);
  const { data } = await axios.post(`${URL_API}/recipe`, { ...newRecipe }, config);
  return data;
};
