import { Outlet } from "react-router-dom";
import Recipes from "../../containers/recipes/recipes";
import RecipesList from "../../containers/recipes/recipes";

export default function RecipesPage(){

    return(
        <>
        <h1 className='text-center font pt-5 text-xl mt-24'>ALL RECIPES !</h1>
        <Outlet />
        
        </>
    )
}