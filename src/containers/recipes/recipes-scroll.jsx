import axios from "axios";

import { useEffect} from "react";
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
    "Recipes",
    async ({ pageParam = 0}) => {
      const { data } = await axios.get(
        `http://localhost:8080/api/recipe?limit=3&offset=${pageParam}`
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.data
    }
  );

  
  useEffect(() => {
    
  if (inView && hasNextPage) {
    // setOffset(3)
    // setOffset(offset+3)
    fetchNextPage()
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
          {data.pages.map((page, pageIndex) => (
            <div key={pageIndex} >
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
              onClick={() => fetchNextPage()}
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
      <Link to="/about">
       ff
      </Link>
    </div>
  );
}
