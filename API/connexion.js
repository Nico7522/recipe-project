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

export const useFetchUser = () => {
  const queryClient = useQueryClient();
  return useQuery('Users', async () => {
    return await axios.get('http://localhost:8080/api/user').then(({data}) => { 
    console.log(data);  
    return data})
  })
}

export const useFetchUserById = ({userId}) => {
  const queryClient = useQueryClient();
  return useQuery(['Users', userId], async () => {
    const { data } = await axios.get(`http://localhost:8080/api/user/${userId}`)  
    return data.result
  })
}
