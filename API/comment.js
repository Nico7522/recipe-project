import axios from "axios";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useFetchAllRecipes } from "./recipe";
import { useQuery } from "react-query";
const URL_API = import.meta.env.VITE__URL_API;

export const useFetchComments = () => {
  const queryClient = useQueryClient();
  return useQuery("Comments", async () => {
    const { data } = await axios.get(
      `${URL_API}/recipe/comment`
    );

    return data.results;
  });
};

export const useFetchCommentById = ({ cId }) => {
  const queryClient = useQueryClient();
  return useQuery(["Comments", cId], async () => {
    const { data } = await axios.get(
      `${URL_API}recipe/comment/${cId}`
    );
    return data.result.text;
  });
};

export const useFetchCommentsAdmin = () => {
  const queryClient = useQueryClient();
  return useQuery("Comments", async () => {
    const { data } = await axios.get(`${URL_API}/comment`);

    return data.results;
  });
};

export const postComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (comment) => {
      await axios.post(`${URL_API}/recipe/comment`, comment);
    },

    {
      onMutate: async (comment, variables) => {
        await queryClient.cancelQueries({
          queryKey: ["Comments", comment],
        });
        const previousComments = queryClient.getQueryData("Comments");
        queryClient.setQueryData("Comments", (old) => {
          if (Array.isArray(old)) {
            return [...old, comment];
          } else {
            return [old, comment];
          }
        });
        return { previousComments };
      },

      onError: async (err, comment, context) => {
        queryClient.setQueryData("Comments", context.previousComments);
      },
      onSettled: (data, context, variables, err, comment) => {
        queryClient.invalidateQueries("Comments");
        queryClient.invalidateQueries("Recipes", variables.RecipeId);
      },
    }
  );
};

export const validComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
      async ({ id, validity }) => {
     return axios.patch(`${URL_API}/comment/${id}`, {
        valid: validity,
      });
    },
    {
      onMutate: async (variables) => {
        console.log(variables);
        await queryClient.cancelQueries({ queryKey: ['Comments', variables.id] });
        const previousComment = queryClient.getQueryData(["Comments", variables.id]);
        queryClient.setQueryData(["Comments", variables.id], variables);

        return { previousComment, variables };
      },
      onError: (error, data, context) => {
        console.log(context.previousUser);
        queryClient.setQueryData(
          ["Comments", context.data.id],
          context.previousUser
        );
      },
      onSettled: ({data}, error, {id, validity}, context) => {
        console.log(data);
        queryClient.invalidateQueries({ querKey: ['Comments', data.result.id] });
      },
    }
  );
};

export const updateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (up) => {
      return axios.put(
        `${URL_API}/recipe/comment/` + up.idComment,
        { text: up.text }
      );
    },
    {
      onMutate: async (up) => {
        await queryClient.cancelQueries(["Comments", up.idComment]);
        const previousComment = queryClient.getQueryData([
          "Comments",
          up.idComment,
        ]);
        queryClient.setQueryData(["Comments", up.idComment], up);
        return { previousComment, up };
      },
      onError: (err, up, context) => {
        queryClient.setQueryData(
          ["Comments", context.up.idComment],
          context.previousComment
        );
      },
      onSettled: (data, error, variables) => {
        console.log(variables);
        queryClient.invalidateQueries(["Comments", variables.id]);
      },
    }
  );
};

export const deleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      axios.delete(`${URL_API}/comment/${id}`);
    },
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries(["Recipes", variables.id]);
        const previousComment = queryClient.getQueriesData([
          "Comments",
          variables.id,
        ]);

        queryClient.setQueryData(["Comments", variables.id]);
        return { previousComment };
      },
      onError: (err, id, context) => {
        queryClient.setQueryData(["Comments", id], context.previousRecipes);
      },

      // { id } => déstructure l'id du context
      onSettled: (data, error, variables, context) => {
   
        queryClient.invalidateQueries(["Comment", variables.id]);
  
      },
    }
  );
};