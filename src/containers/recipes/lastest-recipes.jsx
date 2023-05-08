import { useFetchAllRecipes, useFetchLastestRecipes } from "../../../API/recipe"
import Recipe from "../../components/recipe/recipe-component"

export default function LastestRecipe(){
    const { isLoading, data, error } = useFetchLastestRecipes()
    if (isLoading) {
      return <p>Loading...</p>
    };
    if (error) {
      return <p>{error.response.data}</p>
    }

    return (
        <>
        {data.results.map(recipe => (
            <Recipe key={recipe.id} {...recipe} />
        ))}
        </>
    )
}
{/* <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>{data.results.map(r => (
  <h3 key={r.id}>{r.name}</h3> 
 ))}</div> */}