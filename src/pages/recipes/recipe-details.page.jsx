import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import RecipeDetails from "../../containers/recipes/recipe-details";

export default function RecipeDetailsPage(){
    const { recipeId } = useParams()

    // console.log(id);
    return (
        <RecipeDetails recipeId={recipeId} />
    )
}