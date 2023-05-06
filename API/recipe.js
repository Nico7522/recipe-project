import { QueryClient, useMutation, useQuery } from "react-query";


   export const GetAllRecipe = (isLoading, error, data) => {
     return ({ isLoading, error, data } = useQuery("Recipes", () =>
       fetch("http://localhost:8080/api/recipe").then((r) => r.json())
     ));
   }
   
 



