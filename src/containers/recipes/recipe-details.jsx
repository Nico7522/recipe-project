import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useFetchRecipeById } from "../../../API/recipe";
import Button from "../../components/button";
import Recipe from "../../components/recipe/recipe-component";
import { useFetchUser } from "../../hooks/user-hooks";
import { useQuery } from "react-query";
import { deleteRecipe } from "../../../API/recipe";

export default function RecipeDetails({ recipeId }) {
  const queryClient = useQueryClient();
  const { mutate, context} = deleteRecipe()

  const { error, data, isFetched, isLoading } = useFetchRecipeById({
    recipeId,
  });
  const { token, userStatus, userId} = useFetchUser()
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

  if (context) {
    return <h1 className="font text-red-500 text-center text-5xl">RECIPE DELETED ! </h1>
  }

  return (
  <>
  <Recipe userId={userId} token={token} {...data.result} />
 {userId === data.result.creatorId && <div onClick={() => mutate(data.result.id)} className="w-96 m-auto text-center"><Button style={"bg-red-300 -ml-8"}  text={"DELETE"}/></div>}
  </>)
}
