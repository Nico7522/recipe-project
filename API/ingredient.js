import axios from "axios"
import { useQuery } from "react-query"
import { useQueries } from "react-query"


export const useFetchIngredient = () => {
    return useQuery('Ingredients', async () => {
         const { data } = await axios.get('http://localhost:8080/api/ingredient/')
    
        return data.results
    })
}