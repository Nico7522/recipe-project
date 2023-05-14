import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import axios from "axios";

export const fetchUser = async (userLog) => {
    const { data } = await axios.post('http://localhost:8080/api/user/login', userLog);
  return data;
}