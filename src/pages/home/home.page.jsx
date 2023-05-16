import LastestRecipes from "../../containers/recipes/lastest-recipes";
import RecipesList from "../../containers/recipes/recipes-list";

export default function HomePage() {
  const handleScroll = () => {
    // setScrollTop(e.currentTarget.scrollTop);
    // console.log(scrollTop);
    console.log('test');
}
  return (
    <div className="height" onScroll={handleScroll}>

      <h1 className="text-center font pt-5 text-xl ">LASTEST RECIPES</h1>
      <LastestRecipes  />

    </div>
    
    
    
  );
}
