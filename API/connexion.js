import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { fetchUser, fetchUserById } from "./FETCH/fetch-user";
import { updatePassword, updateUserStatut } from "./PATCH/patch-user-statut";
import { removeUser } from "./DELETE/delete-user";
import { useDispatch } from "react-redux";
import { loginAction } from "../src/store/actions/user.action";
import { useNavigate } from "react-router-dom";
import { userLogin } from "./POST/user";
const URL_API = import.meta.env.VITE__URL_API;



// Get all users
export const useFetchUser = () => {
  return useQuery({ queryKey: ["Users"], queryFn: fetchUser });
};

// Get user by ID
export const useFetchUserById = ( {logedUserId} ) => {
  return useQuery({ queryKey: ['Users', logedUserId ], queryFn: () => fetchUserById(logedUserId)});
};

// Login user
export const loginUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const nav = useNavigate();
  return useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      dispatch(loginAction(data.result));
      nav("/recipes/all");
    },
    onSettled: () => {
      queryClient.invalidateQueries("Users");
    },
  });
};



export const resetPassword = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePassword,
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["Users", data.userId],
      });
      const previousUser = queryClient.getQueryData(["Users", data.userId]);
      queryClient.setQueryData(["Users", data.userId], data.password);
      return { previousUser, data };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["Users", context.data.userId],
        context.previousUser
        );
    },
    onSettled: (data, error, user) => {
      console.log(error,'onSettled');
      queryClient.invalidateQueries({ queryKey: ["Users", user.userId] });
      
    },
  })

};

export const RegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user) => {
      const { data } = await axios.post(
        `${URL_API}/user/signup`,
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
      onSettled: (err, context) => {
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
        context.previousUser
      );
    },
    onSettled: ({ data }) => {
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
  });
};
