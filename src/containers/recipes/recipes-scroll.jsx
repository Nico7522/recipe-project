import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";

export default function RecipeScroll() {
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState(0);
  const {
    status,
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
        "http://localhost:8080/api/recipe?limit=3&offset=" + pageParam
      );
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.id ?? undefined,
      getNextPageParam: (lastPage) => lastPage.id ?? undefined,
    }
  );

  
  useEffect(() => {
    console.log('offset', offset);
    if (inView) {
      setOffset(offset + 3);
      fetchNextPage({ pageParam: offset });
    }
  }, [inView]);

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            {console.log(data)}
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div>
          {data.pages.map((page) => (
            <div key={page.id}>
              {page.results.map((recipe) => (
                <p
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "10rem 1rem",
                    background: `hsla(${recipe.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={recipe.id}
                >
                  {recipe.name}
                </p>
              ))}
            </div>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage({ pageParam: 3 })}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
      <hr />
      <Link href="/about">
        <a>Go to another page</a>
      </Link>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </div>
  );
}
