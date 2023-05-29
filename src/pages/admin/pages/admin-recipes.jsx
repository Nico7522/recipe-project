import Title from "../../../components/title/title";
import RecipeGestion from "../../../containers/admin/recipesgestion/recipe-gestion";

export default function AdminRecipesPage(){
    return(
        <>
        <Title className={"mt-12"} text={"Recipes gestion"} />
            <RecipeGestion />
        </>
    )

}