import { useFetchTopRecipes } from "../../../API/recipe"
import Recipe from "../../components/recipe/recipe-component"
import Title from "../../components/title/title"

export default function TopRecipe(){
    const {data, isLoading, isError} = useFetchTopRecipes()

    if (isLoading) {
        return <p>Wait...</p>
    };

    if (isError) {
       return <p>Error ! </p>
    }

 
    return (
        <>
      <Title text={'MOST POPULAR RECIPES'} className={"md:mt-40"} />
              {data.map((recipe) => (
        <Recipe key={recipe.id} {...recipe} />
      ))}
        </>
    )
}