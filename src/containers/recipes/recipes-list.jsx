import { useFetchAllRecipes } from "../../../API/recipe";
import Button from "../../components/button";
import Recipe from "../../components/recipe/recipe-component";
import Title from "../../components/title/title";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchUser } from "../../hooks/user-hooks";
import SearchBar from "../../components/searchbar/searchbar";

export default function RecipesList({ limit, offset }) {
  const { isLoading, data, error } = useFetchAllRecipes();
  const { token, userStatus, userId } = useFetchUser();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <div className="customloader"></div>;
  }
  if (error) {
    return <p>{error.response.data}</p>;
  }

  console.log("search", search);
  return (
    <>
      <Title text={"ALL RECIPES !"} />
      <div className="w-96 m-auto">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="absolute -mt-11 right-0">
        <Link to="/recipes/create">
          <Button text={"CREATE A NEW RECIPE"}></Button>
        </Link>
      </div>
      {data.results.map((recipe) =>
        recipe.name.includes(search) ? (
          <Recipe userId={userId} key={recipe.id} {...recipe} />
        ) : (
          ""
        )
      )}
    </>
  );
}
{
  /* <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>{data.results.map(r => (
  <h3 key={r.id}>{r.name}</h3> 
 ))}</div> */
}
