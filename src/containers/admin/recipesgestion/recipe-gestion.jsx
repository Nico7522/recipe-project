import { getAll } from "../../../../API/recipe"
import RecipeAdmin from "../../../components/recipe/recipe-admin";

export default function RecipeGestion() {
    const {data, isError, isLoading} = getAll()

    if (isLoading) {
        return <p>Wait...</p>
    }

    if (isError) {
        return <p>Error !</p>
    }
    
    return (
        <div className="grid grid-cols-4 gap-4 w-3/4 m-auto mt-32 bg-slate-400">

         {data.map((recipe) => {
            return <RecipeAdmin {...recipe} />
         })}
        </div>
    )
}