import { useRef } from "react";
import LastestRecipes from "../../containers/recipes/lastest-recipes";
import RecipesList from "../../containers/recipes/recipes-list";

export default function HomePage() {
  return (
    <>
      <h1 className="text-center font pt-5 text-xl ">LASTEST RECIPES</h1>
      <LastestRecipes />
    </>
  );
}
