// import { useFetchAllRecipes } from "../../../API/recipe";
// import Button from "../../components/button";
// import Recipe from "../../components/recipe/recipe-component";
// import Title from "../../components/title/title";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useFetchUser } from "../../hooks/user-hooks";
// import SearchBar from "../../components/searchbar/searchbar";
// import { useRef } from "react";
// import { useId } from "react";
// import axios from "axios";
// import Loader from "../../components/loader/loader";
// import { useInView } from "react-intersection-observer";

// export default function RecipesList() {

//   const [offset, setOffset] = useState(0);
//   const [finish, setFinish] = useState(false);
//   const { isLoading, data, error, isPreviousData, isFetching } =
//     useFetchAllRecipes(offset);

//   const { token, userStatus, userId } = useFetchUser();
//   const [search, setSearch] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [newRecipes, setNewRecipes] = useState([]);
//   // const [newRecipes, setNewRecipes] = useState([])
//   const listInnerRef = useRef();
//   const idP = useId();

//   useEffect(() => {
//     if (data) {
//       setRecipes((recipes) => [...recipes, ...data.results]);

//       if (data.results.length === 0) {
//         setFinish(true);
//       }
//     }
//   }, [data]);

//   if (isLoading) {
//     return <div className="customloader"></div>;
//   }
//   if (error) {
//     return <p>{error.response.data}</p>;
//   }

//   const onScroll = () => {
//     if (listInnerRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
//       if (!finish && !isFetching && scrollTop + clientHeight === scrollHeight) {
//         setOffset(offset + 3);

//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-7.2rem)]">
//       <div
//         onScroll={onScroll}
//         ref={listInnerRef}
//         className="flex-grow overflow-scroll scrollbar-hide flex flex-col gap-5 -mt-8"
//       >
//         <div className="flex flex-row items-center justify-between">
//           <Title text={"ALL RECIPES !"} className="order-2 text-slate-100" />

//           <SearchBar
//             search={search}
//             setSearch={setSearch}
//             className="order-1"
//           />

//           <Link to="/recipes/create" className="order-3">
//             <Button text={"CREATE A NEW RECIPE"}></Button>
//           </Link>
//         </div>

//         {recipes.map((recipe) =>
//           recipe.name.includes(search) ? (
//             <Recipe key={recipe.id} userId={userId} {...recipe} />
//           ) : (
//             ""
//           )
//         )}

//         {isFetching && <Loader className="flex justify-center" />}
//       </div>
//     </div>
//   );
// }

import { useInfiniteQuery } from "react-query";
// import { useFetchAllRecipes } from "../../../API/recipe";

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
import { useFetchComments } from "../../../API/comment";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import generateSearchParams from "../../../utils/generate-search-params";
import { FormProvider, useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";

export default function RecipeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();
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
    [
      "Recipes",
      { tag: searchParams.get("tag") || searchParams.get("name") || "" },
    ],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `http://localhost:8080/api/recipe?page=${pageParam}&tag=${
          searchParams.get("tag") || ""
        }`
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
  const handleSearchTag =  (t) => {
    const searchParam = generateSearchParams(["Main course", "Dessert"]);
    console.log(searchParam);
    // let paramsURL = new URLSearchParams();
    setSearchParams({ tag: t });
    // paramsURL.append("tag", "Main course");
    // paramsURL.append("tag", "Dessert");
    // let search = "";
    // paramsURL.forEach((r) => (search += `&tag=${r}`));

    navigation(`/recipes/search?${searchParam}`);
  };

  if (isLoading) {
    return <div className="customloader"></div>;
  }
  if (error) {
    return <p>{error.response.data}</p>;
  }

  return (
    <div className="flex flex-col -mt-20 ml-12">
      <div className="flex-grow overflow-scroll scrollbar-hide flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center w-96 m-auto">
          <Title text={"ALL RECIPES !"} className="order-2 md:mt-20 lg:mt-20" />
          
          <Link to="/recipes/create" className="order-3 ">
            <Button text={"CREATE A NEW RECIPE"}></Button>
          </Link>
        </div>

        {data.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.results.map((recipe) => (
              <Recipe
                handleSearchTag={handleSearchTag}
                key={recipe.id}
                userId={userId}
                {...recipe}
              />
            ))}
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            ></button>
          </div>
        ))}

        {isFetching && <Loader className="flex justify-center" />}
      </div>
    </div>
  );
}
