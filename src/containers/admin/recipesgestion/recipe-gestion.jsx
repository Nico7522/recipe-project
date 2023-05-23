import { getAll } from "../../../../API/recipe"

export default function RecipeGestion() {
    const {data, isError, isLoading} = getAll()
    console.log(data);
    return (
        <div>
            {isLoading ? <p>Wait...</p> : isError ? <p>Error!</p> : (data.map(r => {
                return <h2>{r.name}</h2>
            }))}
        </div>
    )
}