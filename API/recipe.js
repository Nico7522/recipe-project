import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useFetchLastestRecipes = () => {
  const queryClient = useQueryClient();
  return useQuery(["Recipes", { limit: 3, offset: 0 }], () =>
    fetch("http://localhost:8080/api/recipe?limit=3&offset=0").then((r) =>
      r.json()
    )
  );
};

export const useFetchAllRecipes = () => {
  const queryClient = useQueryClient();
  return useQuery("Recipes", () =>
    fetch("http://localhost:8080/api/recipe/").then((r) => r.json())
  );
};

export const useFetchRecipeById = ({ recipeId }) => {
  const queryClient = useQueryClient();
  return useQuery(["Recipes", recipeId], async () => {
   return await axios
      .get("http://localhost:8080/api/recipe/" + recipeId)
      .then(({data}) => {
        return data;
      });
  });
};

export const PostRecipe = (recipe) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (recipe) => {
      await axios.post("http://localhost:8080/api/recipe", recipe);
    },
    {
      onMutate: async (recipe) => {
        await queryClient.cancelQueries({
          queryKey: ["Recipes", recipe],
        });
        const previousRecipes = await queryClient.getQueryData("Recipes");
        queryClient.setQueryData("Recipes", (old) => [old, recipe]);

        return { previousRecipes };
      },

      onError: (err, recipe, context) => {
        queryClient.setQueryData("Recipes", context.previousRecipes);
      },

      onSettled: () => {
        queryClient.invalidateQueries("Recipes");
      },
    }
  );
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

export const deleteRecipe = (id) => {
  const queryClient = useQueryClient();
  const naviguation = useNavigate();
  return useMutation(
    async (id) => {
      axios.delete(`http://localhost:8080/api/recipe/${id}`);
    },
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["Recipes", id]);
        const previousRecipes = queryClient.getQueriesData(["Recipes", id]);

        queryClient.setQueryData(["Recipes", id]);
        return { previousRecipes };
      },
      onError: (err, id, context) => {
        queryClient.setQueryData(["Recipes", id], context.previousRecipes);
      },

      // { id } => déstructure l'id du context
      onSettled: (data, err, context) => {
        queryClient.invalidateQueries(["Recipes", context.id]);
        console.log(context);
        setTimeout(() => {
          naviguation("/recipes");
        }, 2000);
      },
    }
  );
};
