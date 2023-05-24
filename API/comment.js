import axios from "axios";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useFetchAllRecipes } from "./recipe";
import { useQuery } from "react-query";

export const useFetchComments = () => {
  const queryClient = useQueryClient();
  return useQuery("Comments", async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/recipe/comment"
    );

    return data.results;
  });
};
export const postComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (comment) => {
      await axios.post("http://localhost:8080/api/recipe/comment", comment);
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
        queryClient.invalidateQueries("Recipes");
      },
    }
  );
};