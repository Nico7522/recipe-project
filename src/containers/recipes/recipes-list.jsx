import { useFetchAllRecipes } from "../../../API/recipe"
import Button from "../../components/button"
import Recipe from "../../components/recipe/recipe-component"
import Title from "../../components/title/title"
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchUser } from "../../hooks/user-hooks";

export default function RecipesList({limit, offset}){
  const { isLoading, data, error } = useFetchAllRecipes()
  const [token, userStatus, userId ] = useFetchUser()



    if (isLoading) {
      return <div className="customloader"></div>
    };
    if (error) {
      return <p>{error.response.data}</p>
    }
    

    return (
        <>
       
        <Title text={'ALL RECIPES !'}/>
        <div className="absolute right-0 top-16 w-46">
        
        <Link to='/recipes/create'><Button text={"CREATE A NEW RECIPE"}></Button></Link>
        </div>
        {data.results.map(recipe => (
            <Recipe userId={userId} key={recipe.id} {...recipe} />
        ))}
        </>
    )
}
{/* <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>{data.results.map(r => (
  <h3 key={r.id}>{r.name}</h3> 
 ))}</div> */}