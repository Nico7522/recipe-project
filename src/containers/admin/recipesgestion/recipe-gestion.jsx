import { useInfiniteQuery } from "react-query";
import { getAll } from "../../../../API/recipe";
import RecipeAdmin from "../../../components/recipe/recipe-admin";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function RecipeGestion() {
    const { ref, inView } = useInView();
  // const {data, isError, isLoading} = getAll()
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
    ["Recipes"],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `http://localhost:8080/api/recipe/admin?page=${pageParam}`
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
    <div className=" w-3/4 m-auto break-words overflow-scroll  bg-slate-400">
      {/* {data.map((recipe) => {
        return <RecipeAdmin {...recipe} />;
      })} */}

      {data.pages.map((page, pageIndex) => (
        <div className="flex flex-row flex-wrap justify-center w-3/4 h-96 m-auto" key={pageIndex}>
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
