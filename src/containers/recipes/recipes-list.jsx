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
import { useRef } from "react";
import { useId } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";

export default function RecipesList() {
  const [offset, setOffset] = useState(0);
  const [finish, setFinish] = useState(false);
  const { isLoading, data, error, isPreviousData, isFetching } =
    useFetchAllRecipes(offset);

  const { token, userStatus, userId } = useFetchUser();
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);
  // const [newRecipes, setNewRecipes] = useState([])
  const listInnerRef = useRef();
  const idP = useId();

  useEffect(() => {
    if (data) {
      setRecipes((recipes) => [...recipes, ...data.results]);

      if (data.results.length === 0) {
        setFinish(true);
      }
    }
  }, [data]);

  if (isLoading) {
    return <div className="customloader"></div>;
  }
  if (error) {
    return <p>{error.response.data}</p>;
  }

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (!finish && !isFetching && scrollTop + clientHeight === scrollHeight) {
        setOffset(offset + 3);
      
      }
    }
  };

  return (
    <div className=" z0 flex flex-col h-[calc(100vh-7.2rem)]">
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        className="flex-grow overflow-scroll scrollbar-hide flex flex-col gap-5"
      >
        <div className="flex flex-row items-center justify-between">
          <Title text={"ALL RECIPES !"} className="order-2 text-slate-100" />

          <SearchBar
            search={search}
            setSearch={setSearch}
            className="order-1"
          />

          <Link to="/recipes/create" className="order-3">
            <Button text={"CREATE A NEW RECIPE"}></Button>
          </Link>
        </div>

        {recipes.map((recipe) =>
          recipe.name.includes(search) ? (
            <Recipe key={recipe.id} userId={userId} {...recipe} />
          ) : (
            ""
          )
        )}

        {isFetching && <Loader className="flex justify-center" />}
      </div>
    </div>
  );
}
