import { useSearchParams } from "react-router-dom"
import { useFetchRecipe } from "../../../API/recipe"
import Recipe from "../../components/recipe/recipe-component"
import Title from "../../components/title/title"

export default function RecipeSearch() {
    const [searchParams] = useSearchParams()

    
    const {data, isError, isLoading } = useFetchRecipe({tags:searchParams.getAll('tag'), recipe:searchParams.get('name'), ingredients:searchParams.getAll('ingredient')})
    if (isLoading) {
        return <p>Wait...</p>
    }
    if (isError) {
        return <p>Error ! </p>
    }
    return (
       
        
        <div className="flex flex-col sm:mt-7 ml-14 -mt-20 md:mt-20  lg:-mt-7 lg:ml-5">
        <Title text={"ALL RECIPES !"} className="mt-7 md:mt-20  mb-10" />

        {data.map((recipe) => (
            <Recipe key={recipe.id} {...recipe}/>
        ))}
       
        </div>
       
    )
}