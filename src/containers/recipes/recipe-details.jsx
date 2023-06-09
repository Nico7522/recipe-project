import { useQueryClient } from "react-query";
import { useFetchRecipeById } from "../../../API/recipe";
import Recipe from "../../components/recipe/recipe-component";
import { useFetchUser } from "../../hooks/user-hooks";
import { deleteRecipe } from "../../../API/recipe";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

export default function RecipeDetails({ recipeId }) {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate,
    isSuccess,
    error: errorOnDelete,
    data: isRecipeDeleted,
  } = deleteRecipe();

  const {
    data,
    isFetched,
    error: errorOnFetch,
    isLoading,
  } = useFetchRecipeById({
    recipeId,
  });
  const { token, userStatus, userId } = useFetchUser();
  if (isLoading) {
    return <p>Wait...</p>;
  }

  if (errorOnFetch || errorOnDelete) {
    return (
      <div>
        <h1 className="font text-red-500 text-center text-5xl">
          Error, recipe has not been deleted
        </h1>
        {setTimeout(() => {
          nav("/recipes/all");
        }, 2000)}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <h1 className="font text-red-500 text-center text-5xl">
          RECIPE DELETED !{" "}
        </h1>
        {setTimeout(() => {
          nav("/recipes/all");
        }, 2000)}
      </div>
    );
  }

 

  return (
    <>
      <Recipe
        key={data.result.id}
        userId={userId}
        token={token}
        {...data.result}
      />
      {userId === data.result.creatorId && (
        <div
          onClick={() => mutate(data.result.id)}
          className="w-96 m-auto text-center mt-5 mb-5"
        >
          <Button style={"bg-red-300 -ml-8"} text={"DELETE"} />
        </div>
      )}
    </>
  );
}
