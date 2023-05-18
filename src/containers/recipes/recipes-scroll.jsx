
import { useInfiniteQuery } from "react-query";
// import { useFetchAllRecipes } from "../../../API/recipe";
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
import { useInView } from "react-intersection-observer";


export default function RecipeScroll() {
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState(0);
  const { token, userStatus, userId } = useFetchUser();
  const [search, setSearch] = useState("");
  const {
    status,
    isLoading,
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
        `http://localhost:8080/api/recipe?page=${pageParam}`
      );
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.results ?? undefined,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return lastPage.results.length !== 0 ? nextPage : undefined

        }
    }
  );
   
  
  useEffect(() => { 
  if (inView) {
    fetchNextPage()
  }
  }, [inView]);

  if (isLoading) {
    return <div className="customloader"></div>;
  }
  if (error) {
    return <p>{error.response.data}</p>;
  }

  if (inView) {
    console.log('coucou');
  }

  return (

    <div className="flex flex-col " >
      
    <div
      
      className="flex-grow overflow-scroll scrollbar-hide flex flex-col gap-5 -mt-8"
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
      

      {data.pages.map((page, pageIndex) => (
          <div key={pageIndex} >
            {page.results.map((recipe) => (
                          <Recipe key={recipe.id} userId={userId} {...recipe} />

            ))}
     <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          ></button>
          </div>
        ))}
     
      {isFetching && <Loader className="flex justify-center" />}
    </div >
  </div>

    );
  }

  // <div>
  //   <h1>Infinite Loading</h1>
  //   {status === "loading" ? (
  //     <p>Loading...</p>
  //   ) : status === "error" ? (
  //     <span>Error: {error.message}</span>
  //   ) : (
  //     <>
  //       <div>
  //         <button
  //           onClick={() => fetchPreviousPage()}
  //           disabled={!hasPreviousPage || isFetchingPreviousPage}
  //         >
  //           {isFetchingPreviousPage
  //             ? "Loading more..."
  //             : hasPreviousPage
  //             ? "Load Older"
  //             : "Nothing more to load"}
  //         </button>
  //       </div>
  //       {data.pages.map((page, pageIndex) => (
  //         <div key={pageIndex} >
  //           {page.results.map((recipe) => (
  //             <p
  //               style={{
  //                 border: "1px solid gray",
  //                 borderRadius: "5px",
  //                 padding: "10rem 1rem",
  //                 background: `hsla(${recipe.id * 30}, 60%, 80%, 1)`,
  //               }}
  //               key={recipe.id}
  //             >
  //               {recipe.name}
  //             </p>
  //           ))}
  //         </div>
  //       ))}
  //       <div>
  //         <button
  //           ref={ref}
  //           onClick={() => fetchNextPage()}
  //           disabled={!hasNextPage || isFetchingNextPage}
  //         >
  //           {isFetchingNextPage
  //             ? "Loading more..."
  //             : hasNextPage
  //             ? "Load Newer"
  //             : "Nothing more to load"}
  //         </button>
  //       </div>
  //       <div>
  //         {isFetching && !isFetchingNextPage
  //           ? "Background Updating..."
  //           : null}
  //       </div>
  //     </>
  //   )}
  //   <hr />
  //   <Link to="/about">
  //    ff
  //   </Link>
  // </div>