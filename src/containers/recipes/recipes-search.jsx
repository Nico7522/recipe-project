import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
const URL_API = import.meta.env.VITE__URL_API;


export default function RecipesSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {data, isError, isLoading } = useQuery(['Recipes', {tags: searchParams.get('tag')}], async ()  => { const { data } = await axios.get(`${URL_API}/recipe/admin?tag=${searchParams.get('tag')}`); return data})
  const { handleSubmit, register} = useForm({
    
  });

useEffect(() => {
  setSearchParams({})
}, [])
  if (isError) {
    return <p>error</p>
  }

  if (isLoading) {
    return <p>wait...</p>
  }

  return(
      
      <div>
          {/* <form onClick={handleSubmit(handleTag)}>
              <select {...register('tags')} id="tags">
                  <option value="Healthy">Healthy</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Dessert">Dessert</option>
              </select>
              <button type="submit">Valid</button>
          </form> */}
          {data.results.map((r) => (
            <div>
              <h2>{r.name}</h2>
            </div>
          )

          )}
      
      </div>
  )
}