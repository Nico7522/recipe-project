import { useSearchParams } from "react-router-dom"
import { useFetchRecipe } from "../../../API/recipe"

export default function RecipeSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data}= useFetchRecipe((searchParams.get('tag')))
    return (
        <div>
            {}
            {console.log(data)}
            // TO DO
        </div>
    )
}