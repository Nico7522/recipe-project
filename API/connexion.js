import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import axios from "axios";

export const fetchUser = (userLog) => {
    return axios.post('http://localhost:8080/api/user/login', userLog)
}