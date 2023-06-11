import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { fetchRecipe } from "./FETCH/fetch-recipe";
import { updateRecipeValidity } from "./PATCH/patch-recipe-validity";
import { updateImageRecipe } from "./PATCH/patch-image-recipe";
import qs from "qs"
import assert  from 'assert'
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchUser } from "../src/hooks/user-hooks";


export const useFetchRecipe = (params) => {
  const queryClient = useQueryClient();
  const url = window.location.search
  // let hashedUrl = qs.stringify(url)
  // console.log(params);
  // let search = "";
  // let searchIngredient = ""
  // params.tags.forEach((r) => (search += `&tag=${r}`));
  // params.ingredients.forEach((r) => (searchIngredient += `&ingredient=${r}`));
  const isNamePresent = useSelector((state) => state.params.name)
  const isTagsPresent = useSelector((state) => state.params.tags)
  const isIngredientsPresent = useSelector((state) => state.params.ingredients)
  console.log(isTagsPresent);
  return useQuery(
    ["Recipes", { tags: isTagsPresent  }, { name: isNamePresent }, { ingredient: isIngredientsPresent}],
    async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/search?`, {params : {tags: isTagsPresent, ingredient: isIngredientsPresent, name: isNamePresent}, paramsSerializer: param => {return qs.stringify(param)}},
      );

      return data;
    }
  );
};

export const getAll = () => {
  const queryClient = useQueryClient();
  return useQuery({ queryKey: ["Recipes"] , queryFn: fetchRecipe });
};

export const useFetchLastestRecipes = () => {
  const queryClient = useQueryClient();
  return useQuery(["Recipes", { limit: 3, offset: 0 }], async () => {
    const { data } = await axios.get("http://localhost:8080/api/recipe?page=1");
    return data;
  });
};

export const useFetchTopRecipes = () => {
  const queryClient = useQueryClient();
  return useQuery(["Recipes"], async () => {
    const { data } = await axios.get("http://localhost:8080/api/recipe/top");
    return data;
  });
};

export const useFetchAllRecipesScroll = (offset) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: ["Recipes"],
    queryFn: (offset) => fetchRecipe(3),
    getNextPageParam: (lastPage, pages) => lastPage,
  });
};
export const useFetchAllRecipes = (offset, stop) => {
  if (stop === true) {
    return;
  }
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Recipes", offset],
    queryFn: async () =>
      fetch("http://localhost:8080/api/recipe?limit=3&offset=" + offset).then(
        (res) => res.json()
      ),
    keepPreviousData: true,
  });
};

export const useFetchRecipeById = ({ recipeId }) => {
  const queryClient = useQueryClient();
  return useQuery(["Recipes", recipeId], async () => {
    return await axios
      .get("http://localhost:8080/api/recipe/" + recipeId)
      .then(({ data }) => {
        return data;
      });
  });
};

export const PostRecipe = () => {
  const { token, config } = useFetchUser()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${token}'
  }
  
  
  const queryClient = useQueryClient();
  return useMutation(
    async (recipe) => {
     
      console.log(recipe);
      try {
        const response = axios.post("http://localhost:8080/api/recipe", {...recipe}, config)
        console.log(response.data);

      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
          console.log(error.response);
        }
    }},
    {
      onMutate: async (recipe) => {
        await queryClient.cancelQueries({
          queryKey: ["Recipes", recipe],
        });
        const previousRecipes = await queryClient.getQueryData("Recipes");
        queryClient.setQueryData("Recipes", (old) => [old, recipe]);

        return { previousRecipes };
      },

      onError: (error, recipe, context) => {
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

export const deleteRecipe = () => {
  const queryClient = useQueryClient();
  const naviguation = useNavigate();
  return useMutation(
    async (id) => {
      return axios.delete(`http://localhost:8080/api/recipe/${id}`);
    },
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries(["Recipes", variables.id]);
        const previousRecipes = queryClient.getQueriesData([
          "Recipes",
          variables.id,
        ]);

        queryClient.setQueryData(["Recipes", variables.id]);
        return { previousRecipes };
      },
      onError: (err, id, context) => {
       
        queryClient.setQueryData(["Recipes", id], context.previousRecipes);
      },

      // { id } => déstructure l'id du context
      onSettled: (data, error, variables, context) => {
       
        queryClient.invalidateQueries(["Recipes"]);
  
      },
    }
  );
};


// Update de la validité des recipes
export const updateValidity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: updateRecipeValidity,
      onMutate: async (data) => {
        await queryClient.cancelQueries({
          queryKey: ["Recipes", data.id],
        });
        const previousRecipe = queryClient.getQueryData(["Recipes", data.id]);
        queryClient.setQueryData(["Recipes", data.id], data);

        return { previousRecipe, data };
      },
      onError: (error, data, context) => {
        console.log(context.previousRecipe);
        queryClient.setQueryData(
          ["Recipes", context.data.id],
          context.previousRecipe
        );
      },
      onSettled: ({ data }, error, variables, context) => {
        console.log(data.result.id);

        queryClient.invalidateQueries({ querKey: ["Recipes", data.result.id] });
      },
    }
  );
};

export const updateImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateImageRecipe,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["Recipes", data.id] });
      const previousRecipe = queryClient.getQueryData(["Recipes", data.id]);
      queryClient.setQueryData(["Recipes", data.id], data);
      return { previousRecipe, data}
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["Recipes", context.data.id], context.previousRecipe);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["Recipes"] })
    }
  })
}
