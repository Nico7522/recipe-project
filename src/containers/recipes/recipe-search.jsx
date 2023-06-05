import { useSearchParams } from "react-router-dom"
import { useFetchRecipe } from "../../../API/recipe"
import Recipe from "../../components/recipe/recipe-component"
import { useEffect } from "react"

export default function RecipeSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data, isError, isLoading } = useFetchRecipe({tags:searchParams.getAll('tags'), recipe:searchParams.get('name'), ingredients:searchParams.getAll('ingredients')})
    console.log('hello');
    if (isLoading) {
        return <p>Wait...</p>
    }
    if (isError) {
        return <p>Error ! </p>
    }
    return (
        <div className="flex flex-col mt-20 -ml-14">

        {data.map((recipe) => (
            <Recipe {...recipe}/>
        ))}
       
        </div>
    )
}