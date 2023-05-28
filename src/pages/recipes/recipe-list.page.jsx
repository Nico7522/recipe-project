import { Outlet } from "react-router-dom";
import Title from "../../components/title/title";
import RecipesList from "../../containers/recipes/recipes-list";
import { Children } from "react";

export default function RecipeListPage() {
return (
  <div>
    
    
    <RecipesList/>
   <Outlet />

  </div>
 
)}
