import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import axios from "axios";

export const useFetchAllRecipes = (isLoading, error, data) => {
  const queryClient = useQueryClient();
  return useQuery("Recipes", () =>
    fetch("http://localhost:8080/api/recipe").then((r) => r.json())
  );
};



export const useFetchRecipeById = (recipeId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Recipes", recipeId],
    queryFn: (id) =>
      axios
        .get(`http://localhost:8080/api/recipe/` + recipeId)
        .then((res) => res.data),
  });
};

export const useUpdateRecipe = (recipeToUpdate, setError) => {
  const queryClient = useQueryClient();
  return useMutation("recipeToUpdate", {
    // mutationFn: (recipeToUpdate) => axios.put('http://localhost:8080/api/recipe/1', recipeToUpdate),
    // onSuccess: updatedRecipe => {
    //   queryClient.setQueryData(['Recipes', {id : 1}], updatedRecipe.data)
    //   console.log(updatedRecipe.data)
    // }

    onMutate: async (recipeToUpdate) => {
      await queryClient.cancelQueries({
        queryKey: ["Recipes", recipeToUpdate.id],
      });
      const previousRecipe = await queryClient.getQueryData([
        "Recipes",
        recipeToUpdate.id,
      ]);
      queryClient.setQueryData(["Recipes", recipeToUpdate.id], recipeToUpdate);
      return { previousRecipe, recipeToUpdate };
    },
    mutationFn: async (recipeToUpdate) =>
      await axios.put("http://localhost:8080/api/recipe/1", recipeToUpdate),

    onError: ({ response }, recipeToUpdate, context) => {
      console.log("response =>", response);
      queryClient.setQueryData(
        ["Recipes", context.recipeToUpdate.id],
        context.previousRecipe
      );
    },

    onSettled: (data, error, variables, context, recipeToUpdate) => {
      queryClient.invalidateQueries({
        queryKey: ["Recipes", context.recipeToUpdate.id],
      });
    },
  });
};