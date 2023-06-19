import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;


// Get all recipes
export const fetchRecipe = async () => {
  const { data } = await axios.get(`${URL_API}recipe/admin`);
  return data.results;
};
