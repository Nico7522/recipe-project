import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"
import { useQuery } from "react-query"

export default function Recipe({id, name, description, ingredients, reactions}){
    
    // const { data } = useQuery(['Recipes', id], {
    //     queryFn: () => axios.get('http://localhost:8080/api/recipe/react/'+ id)
    // })
    console.log(reactions);
    let like = 0;
    let tasty = 0;

    reactions.forEach((r) => {
        if (r.reaction === "like") {
            like+=1;
        }
        if (r.reaction === "tasty") {
            tasty+=1;
        }
    })
    
 
    return(

        <div key={id} className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>
    
            <h2>{name}</h2>
            <p>{description}</p>
            {ingredients.map(i => (
                <div>
                    <p>{i.name}</p>
                    <p> Calories : {i.calories}</p>
                    <p> Proteins : {i.proteins}</p>
                    <p> Fats : {i.fats}</p>
                    <p> Carbohydrates : {i.carbohydrates}</p>
                    <p>❤ : {like}</p>
                    <p>🤤 : {tasty}</p>
                
                    
                </div>
            ))}
        </div>
    )
}