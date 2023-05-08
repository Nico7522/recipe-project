import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useFetchRecipeById } from "../../../API/recipe";
import Recipe from "../../components/recipe/recipe-component";

export default function RecipeDetails({ recipeId }) {
  const queryClient = useQueryClient();
  const { error, data, isFetched, isLoading } = useFetchRecipeById({
    recipeId,
  });
  console.log("data dans le recipeDetails container =>", data);
  if (isLoading) {
    return <p>Wait...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  return <Recipe {...data.data.result} />;
}
