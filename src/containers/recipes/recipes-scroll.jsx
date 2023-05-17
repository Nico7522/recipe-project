import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function RecipeScroll() {
    const [offset, setOffset ] = useState(0)
    const fetchRecipes = async () => {
    const {data} = await axios.get("http://localhost:8080/api/recipe?limit=3&offset=" + offset)
    return data
  }

 


  const handleNext = () => {
    
    fetchNextPage()
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchRecipes,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
     {console.log(data)}
      <div>
        <button
          onClick={() => handleNext()}
          disabled={hasNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}