import axios from "axios"
import { useQuery } from "react-query"
import { useQueries } from "react-query"
const URL_API = import.meta.env.VITE__URL_API;


export const useFetchIngredient = () => {
    return useQuery('Ingredients', async () => {
         const { data } = await axios.get(`${URL_API}/ingredient/`)
    
        return data.results
    })
}