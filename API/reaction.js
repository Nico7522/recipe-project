import axios from "axios";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useQueries } from "react-query";

export const useFetchReactions = () => {
  const queryClient = useQueryClient();
  return useQuery(
    ["Reactions"],
    () => {
      return axios.get("http://localhost:8080/api/recipe/react");
    },
    {
      onError: (err) => {},
      onSuccess: (data) => {
        return data;
      },
    }
  );
};

export const postReaction = (reaction) => {
   
  const queryClient = useQueryClient();
  return useMutation(
    async (reaction) => {
      await axios.post("http://localhost:8080/api/recipe/react", reaction)
    },

    {
      onMutate: async (reaction, variables) => {
        await queryClient.cancelQueries({
          queryKey: ["Reactions", reaction],
        });
        const previousReactions = queryClient.getQueryData("Reactions");
        queryClient.setQueryData("Reactions", (old) => {
          if (Array.isArray(old)) {
            return [...old, reaction];
          } else {
            return [old, reaction];
          }
        });
        return { previousReactions };
      },

      onError: async (err, reaction, context) => {
        queryClient.setQueryData("Comments", context.previousReactions);
      },
      onSettled: (data, error, variables, comment) => {
        
        queryClient.invalidateQueries("Reactions");
        queryClient.invalidateQueries("Recipes", variables.recipeId);
      },
    }
  );
};
