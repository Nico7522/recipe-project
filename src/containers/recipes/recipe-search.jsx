import { useSearchParams } from "react-router-dom"
import { useFetchRecipe } from "../../../API/recipe"
import Recipe from "../../components/recipe/recipe-component"

export default function RecipeSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data, isError, isLoading } = useFetchRecipe({tags:searchParams.getAll('tag'), recipe:searchParams.get('name')})
 
    if (isLoading) {
        return <p>Wait...</p>
    }
    if (isError) {
        return <p>Error ! </p>
    }
    return (
        <div>

        {data.map((recipe) => (
            <Recipe {...recipe}/>
        ))}
       
        </div>
    )
}