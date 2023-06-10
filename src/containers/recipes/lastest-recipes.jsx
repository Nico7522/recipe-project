import { useFetchLastestRecipes } from "../../../API/recipe";
import Recipe from "../../components/recipe/recipe-component";
import Title from "../../components/title/title";

export default function LastestRecipe() {
  const { isLoading, data, error } = useFetchLastestRecipes();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.response.data}</p>;
  }

  return (
    <>
      <Title text={"LASTEST RECIPES"} className={"md:mt-40"} />

      {data.results.map((recipe) => (
        <Recipe key={recipe.id} {...recipe} />
      ))}
    </>
  );
}
{
}
