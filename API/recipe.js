import { useQuery } from 'react-query'

export default function GetAllRecipe(isLoading, error, data) {
   return {isLoading, error, data} = useQuery('fetchRecipes', () =>
    fetch('http://localhost:8080/api/recipe').then(r => 
       r.json()
    ))
}