import axios from "axios";
import { useQuery } from "react-query";

export const fetchUser = async () => {
  const { data } = await axios.get("http://localhost:8080/api/user");
 
  return data.results
};
