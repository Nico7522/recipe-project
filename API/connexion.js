import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
// L'ORDRE DANS LE QUEL ON PASSE LES ARGUMENTS EST IMPORTANT !!!!!!!!!
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
        return data.results;
      });
  });
};

export const useFetchUserById = ({ logedUserId }) => {
  const queryClient = useQueryClient();
  return useQuery(["Users", logedUserId], async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/user/${logedUserId}`
    );
    return data.result;
  });
};

export const resetPassword = async (id, password) => {
  return await axios
    .patch(`http://localhost:8080/api/user/${id}/resetpassword`, {
      password: password,
    })
    .then(({ data }) => data)
    .catch((error) => error.response.status);
};

export const RegisterUser = (user) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user) => {
      const { data } = await axios.post(
        "http://localhost:8080/api/user/signup",
        user
      );
      return data;
    },
    {
      onMutate: async (user) => {
        await queryClient.cancelQueries({
          queryKey: ["Users", user],
        });
        const previousUsers = queryClient.getQueryData("Users");
        queryClient.setQueryData("Users", (old) => [old, user]);
        return { previousUsers };
      },
      onError: async (err, user, context) => {
        queryClient.setQueryData("Users", context.previousUsers);
        return err;
      },
      onSettled: async (err, context, variable) => {
        queryClient.invalidateQueries("Users");
        return context;
      },
    }
  );
};

export const updateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, statusChange }) => {
      return axios.patch(`http://localhost:8080/api/user/${id}`, {
        status: statusChange,
      });
    },
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries({
          queryKey: ["Users", data.id],
        });
        const previousUser = queryClient.getQueryData(["Users", data.id]);
        queryClient.setQueryData(["Users", data.id], data);

        return { previousUser, data };
      },
      onError: (error, data, context) => {
        console.log(context.previousUser);
        queryClient.setQueryData(
          ["Users", context.data.id],
          context.previousUser
        );
      },
      onSettled: (data, error,  variables, context) => {
        console.log("sdsdsdd",context);

        queryClient.invalidateQueries({
          queryKey: ["Users", data.id],
        });
      },
    }
  );
};

export const deleteUser = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      axios.delete(`http://localhost:8080/api/user/${id}`);
    },
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["Users", id]);
        const previousUsers = queryClient.getQueriesData(["Users", id]);

        queryClient.setQueryData(["Users", id]);
        return { previousUsers };
      },
      onError: (err, id, context) => {
        queryClient.setQueryData(["Users", id], context.previousUsers);
      },

      onSettled: (data, err, {id}, context) => {
        queryClient.invalidateQueries(["Users", id]);
     
      },
    }
  );
};
