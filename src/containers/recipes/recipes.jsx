import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Recipes() {
    const [searchParams, setSearchParams] = useSearchParams()
    // const recipes = useQuery(['Recipes', {tags: searchParams}])
    const { handleSubmit, register} = useForm();

   const handleTag = ({tags}) => {
    console.log(data);
    setSearchParams({'tag': "tags"})
    console.log(searchParams.get('tag'));
   }
    return(
        
        <div>
            <form onClick={handleSubmit(handleTag)}>
                <select {...register('tags')} id="tags">
                    <option value="Healthy">Healthy</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Dessert">Dessert</option>
                </select>
                <button type="submit">Valid</button>
            </form>
        </div>
    )
}