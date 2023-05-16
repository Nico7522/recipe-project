import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";

export const fetchUser = async (userLog) => {
  const { data } = await axios.post(
    "http://localhost:8080/api/user/login",
    userLog
  );
  return data;
};

export const useFetchUser = () => {
  const queryClient = useQueryClient();
  return useQuery("Users", async () => {
    return await axios
      .get("http://localhost:8080/api/user")
      .then(({ data }) => {
        console.log(data);
        return data;
      });
  });
};

export const useFetchUserById = ({ userId }) => {
  const queryClient = useQueryClient();
  return useQuery(["Users", userId], async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/user/${userId}`
    );
    return data.result;
  });
};

export const resetPassword = async (id, password) => {
  return await axios.patch(
    `http://localhost:8080/api/user/${id}/resetpassword`,
    { password: password }
  ).then(({data}) => (data))
   .catch((error) => (error.response.status))
};

export const RegisterUser = (user) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user) => {
      const { data } = await axios.post('http://localhost:8080/api/user/signup', user)
      return data
    },
    {
      onMutate: async (user) => {
        await queryClient.cancelQueries({
          queryKey: ['Users', user]
        });
        const previousUsers = queryClient.getQueryData('Users');
        queryClient.setQueryData('Users', (old) => [old, user]);
        return { previousUsers }
      },
      onError : async (err, user, context) => {
       
        queryClient.setQueryData('Users', context.previousUsers)
        return err
      },
      onSettled: async (err, variable, context) => {
        console.log('context',context);
        console.log('variable',variable);
        console.log('err',err);
        return context
        queryClient.invalidateQueries("Users");

      },
    
    }
  )
}
