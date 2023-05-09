import LastestRecipes from "../../containers/recipes/lastest-recipes";
import RecipesList from "../../containers/recipes/recipes-list";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center font pt-5 text-xl mt-24">LASTEST RECIPES</h1>
      <LastestRecipes  />
    </div>
  );
}
