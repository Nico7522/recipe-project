import axios from "axios";


// Get all recipes
export const fetchRecipe = async () => {
  const { data } = await axios.get("http://localhost:8080/api/recipe/admin");
  return data.results;
};
