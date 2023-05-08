import axios from "axios"
import { useEffect } from "react"
import { useQuery } from "react-query"

export default function Recipe({id, name, description, ingredients}){
useEffect(() => {
    const r = axios.get('http://localhost:8080/api/recipe/react/'+id).then((r) => (r))

    return {r}
}, [])
   
    return(

        <div key={id} className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>
            {console.log(r)}
            <h2>{name}</h2>
            <p>{description}</p>
            {ingredients.map(i => (
                <div>
                    <p>{i.name}</p>
                    <p> Calories : {i.calories}</p>
                    <p> Proteins : {i.proteins}</p>
                    <p> Fats : {i.fats}</p>
                    <p> Carbohydrates : {i.carbohydrates}</p>
                </div>
            ))}
        </div>
    )
}