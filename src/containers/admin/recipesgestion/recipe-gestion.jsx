import { useInfiniteQuery } from "react-query";
import { getAll } from "../../../../API/recipe";
import RecipeAdmin from "../../../components/recipe/recipe-admin";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ValidForm from "../../../components/validform/validform";
const URL_API = import.meta.env.VITE__URL_API;

export default function RecipeGestion() {
    const { ref, inView } = useInView();
    const [valid, setValid] = useState(undefined);

    const handleValid = (valid) => {
      setValid(valid);
    };
  const {
    status,
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["Recipes", {valid: valid}],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `${URL_API}/recipe/admin?page=${pageParam}&valid=${valid || ''}`
      );
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.results ?? undefined,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.results.length !== 0 ? nextPage : undefined;
      },
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <p>Wait...</p>;
  }

  if (isError) {
    return <p>Error !</p>;
  }

  return (
    <div className=" w-3/4 m-auto break-words  bg-slate-400">
    <ValidForm text={"Only show unvalided recipe ?"} handleValid={handleValid} valid={valid} />

      {data.pages.map((page, pageIndex) => (
        <div className="flex flex-row flex-wrap justify-center w-3/4  m-auto" key={pageIndex}>
          {page.results.map((recipe) => (
            <RecipeAdmin key={recipe.id} {...recipe} />
          ))}
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          ></button>
        </div>
      ))}
    </div>
  );
}
