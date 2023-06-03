import axios from "axios";
import { useQuery } from "react-query";

export const fetchRecipe = async () => {
  const { data } = await axios.get("http://localhost:8080/api/recipe/admin");
  return data.results;
};
