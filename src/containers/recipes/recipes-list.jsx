import { useFetchAllRecipes } from "../../../API/recipe"
import Recipe from "../../components/recipe/recipe-component"
import Title from "../../components/title/title"

export default function RecipesList({limit, offset}){
    const { isLoading, data, error } = useFetchAllRecipes()
    if (isLoading) {
      return <div className="customloader"></div>
    };
    if (error) {
      return <p>{error.response.data}</p>
    }
    console.log(data);

    return (
        <>
       
        <Title text={'ALL RECIPES !'}/>
        {data.results.map(recipe => (
            <Recipe key={recipe.id} {...recipe} />
        ))}
        </>
    )
}
{/* <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>{data.results.map(r => (
  <h3 key={r.id}>{r.name}</h3> 
 ))}</div> */}