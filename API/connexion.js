import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { fetchUser } from "./FETCH/fetch-user";
import { updateUserStatut } from "./PATCH/patch-user-statut";
import { removeUser } from "./DELETE/delete-user";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../src/store/actions/user.action";
import { useNavigate } from "react-router-dom";
// L'ORDRE DANS LE QUEL ON PASSE LES ARGUMENTS EST IMPORTANT !!!!!!!!!
export const fetchUserLogin = async (userLog) => {
  const { data } = await axios.post(
    "http://localhost:8080/api/user/login",
    userLog
  );
  return data;
};

export const loginUser = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const nav = useNavigate()
  return useMutation({
    mutationFn: fetchUserLogin,
    onSuccess: (data) => {
        console.log(data);
        dispatch(loginAction(data.result));
        nav("/recipes/all");
      
    },
    onSettled: () => { queryClient.invalidateQueries('Users')}
  })
}

export const useFetchUser = () => {
  const queryClient = useQueryClient();
  return useQuery({ queryKey: ["Users"], queryFn: fetchUser });
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
          queryKey: ["Users"],
        });
        const previousUsers = queryClient.getQueryData("Users");
        queryClient.setQueryData("Users", (old) => [old, user]);
        return { previousUsers };
      },
      onError: (err, user, context) => {
        queryClient.setQueryData("Users", context.previousUsers);
        return err;
      },
      onSettled: (err, context, variable) => {
        queryClient.invalidateQueries("Users");
        return context;
      },
    }
  );
};

// Update du statut des utilisateurs
export const updateStatut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserStatut,
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["Users", data.id],
      });
      const previousUser = queryClient.getQueryData(["Users", data.id]);
      queryClient.setQueryData(["Users", data.id], data);
      return { previousUser, data };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["Users", context.data.id],
        context.previousRecipe
      );
    },
    onSettled: ({ data }, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Users", data.result.id] });
    },
  });
};


// Supprimer des utilisateurs
export const deleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUser,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["Users", id]);
      const previousUsers = queryClient.getQueryData(["Users", id]);
      queryClient.setQueryData(["Users", id]);
      return { previousUsers };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["Users", id], context.previousUsers);
    },
    onSettled: (data, err, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
  });
};
