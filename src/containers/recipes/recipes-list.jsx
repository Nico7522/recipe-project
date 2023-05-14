import { useFetchAllRecipes } from "../../../API/recipe"
import Button from "../../components/button"
import Recipe from "../../components/recipe/recipe-component"
import Title from "../../components/title/title"
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function RecipesList({limit, offset}){
  const [token, setToken] = useState(null)
  const [userStatus, setUserStatus] = useState(null)
  const [userId, setUserId] = useState(null)
    const { isLoading, data, error } = useFetchAllRecipes()
    const isLogged = useSelector(state => state.user.user.token)
    const status = useSelector(state => state.user.user.user.status)
    const id = useSelector(state => state.user.user.user.id)

    useEffect(() => {
      if (isLogged) {
        setToken(isLogged)
        setUserStatus(status)
        setUserId(id)
      }
      console.log(userId);
    }, [token])
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