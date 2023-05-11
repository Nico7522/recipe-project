import { Outlet } from "react-router-dom";
import Recipes from "../../containers/recipes/recipes";
import RecipesList from "../../containers/recipes/recipes";

export default function RecipesPage(){

    return(
        <>
        
        <Outlet />
        
        </>
    )
}