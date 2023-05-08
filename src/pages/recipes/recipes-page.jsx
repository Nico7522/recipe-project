import { Outlet } from "react-router-dom";
import Recipes from "../../containers/recipes/recipes";
import RecipesList from "../../containers/recipes/recipes";

export default function RecipesPage(){

    return(
        <>
        <h1 className='text-center font mt-24'>RECIPE HOME</h1>
        <Outlet />
        
        </>
    )
}