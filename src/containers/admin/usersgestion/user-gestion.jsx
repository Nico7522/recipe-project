import { useInfiniteQuery } from "react-query";
import { useFetchUser } from "../../../../API/connexion";
import UserProfil from "../../../components/profil/profil";
import User from "../../../components/profil/user";
import LastestRecipe from "../../recipes/lastest-recipes";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "../../../components/loader/loader";

export default function UserGestion() {
  const { ref, inView } = useInView();

  const {
    status,
    isLoading,
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["Users"],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `http://localhost:8080/api/user?page=${pageParam}`
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
    <>
      
      <div className="m-auto">
      {data.pages.map((page, pageIndex) => (
        <div className="m-auto bg-white w-4/5 flex flex-row justify-center flex-wrap gap-1 " key={pageIndex} >
          {page.results.map((user) => (
            <User key={user.id} {...user} />
          ))}
        </div>
      ))}
      {isFetching && <Loader className="flex justify-center" />}
      </div>
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      ></button>
    </>
  );
}

// const { data: users, isLoading, isError } = useFetchUser();

// if (isLoading) {
//   return <p>Wait...</p>;
// }

// if (isError) {
//   return <p>Error !</p>;
// }

// return (
//   <>
//     <h2>TO DO ! </h2>

//     <div className="sm:flex sm:flex-wrap sm:m-auto bg-white w-3/4 max-w-7xl m-auto xl:flex xl:flex-wrap xl:gap-2 ">
//       {users.map((user) => {
//         return <User {...user} />;
//       })}
//     </div>
//   </>
// );
