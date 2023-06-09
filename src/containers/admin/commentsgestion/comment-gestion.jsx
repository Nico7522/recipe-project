import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useInRouterContext } from "react-router-dom";
import { useFetchCommentsAdmin } from "../../../../API/comment";
import Comment from "../../../components/comments/comment";
import DuvComment from "../../../components/duv-admin/duv-comment";
import ValidForm from "../../../components/validform/validform";

export default function CommentGestion() {
  // const {data, isLoading, isError} = useFetchCommentsAdmin()
  const { ref, inView } = useInView();
  const [valid, setValid] = useState(undefined);

  const handleValid = (valid) => {
    setValid(valid);
  };
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const {
    isLoading,
    isIdle,
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
    ["Comments", {valid: valid}],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `http://localhost:8080/api/comment?page=${pageParam}&valid=${
          valid || ""
        }`
      );
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.results ?? undefined,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.results !== 0 ? nextPage : undefined;
      },
    }
  );

  if (isLoading || isIdle) {
    return <p>Wait...</p>;
  }

  if (error) {
    return <p>Error ! </p>;
  }
  return (
    <div className="w-3/4 border-2 m-auto bg-gray-800 ">
      <ValidForm text={"Only show unvalided comments ?"} handleValid={handleValid} valid={valid} />

      {data.pages.map((page, pageIndex) => (
        <div
          className="lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-wrap  m-auto w-4/5"
          key={pageIndex}
        >
          {page.map((c) => (
            <section className=" w-86 max-w-96 h-60 m-auto mt-2 bg-green-700 flex flex-col shadow-2xl rounded-md">
            
              <div className="text-center font">
                {c.valid ? (
                  <p className="text-green-800">Valid</p>
                ) : (
                  <p className="text-red-800">Unvalid</p>
                )}
              </div>

              <div className="flex flex-col justify-center w-48 max-w-56 h-40 m-auto mt-1 bg-green-700 rounded-2xl text-center break-words overflow-scroll overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-red-700 scrollbar-track-green-700 scrollbar-w-1 ">
                {c.creatorId ? (
                  <h3>
                    {" "}
                    <span className="font">User ID :</span>
                    {c.creatorId} <span className="font">& Author : </span>
                    {c.userName}
                  </h3>
                ) : (
                  <p className="bg-red-300">No user found</p>
                )}
                <p className="">
                  <span className="font">Comment :</span>
                  {c.text}
                </p>
                <h3 className="flex flex-col">
                  {" "}
                  {c.recipeId && <span className="font">Recipe ID :</span>}
                  {c.recipeId}{" "}
                  {c.recipeName && <span className="font">& Name : </span>}
                  {c.recipeName}
                </h3>
              </div>

              <DuvComment id={c.id} />
            
              </section>
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

{
  /* {data.map((c) => (
                <section className="max-w-52 h-60 m-auto mt-2 bg-green-700">
                   <div className="text-center font">
                    {c.valid ? <p className="text-green-800">Valid</p> : <p className="text-red-800">Unvalid</p>}

                   </div>
                 
                <div className="flex flex-col justify-center w-60 h-40 m-auto mt-1 bg-green-700 rounded-2xl text-center break-words overflow-scroll overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-red-700 scrollbar-track-green-700 scrollbar-w-1 "> 
                    <h3 > <span className="font">User ID :</span>{c.user_id} <span className="font">& Author : </span>{c.user_name}</h3>
                    <p className=""><span className="font">Comment :</span>{c.text}</p>
                    <h3 className="flex flex-col" > {c.recipe_id && <span className="font">Recipe ID :</span>}{c.recipe_id} {c.recipe_name && <span className="font">& Name : </span>}{c.recipe_name}</h3>
                    
                </div>

                <DuvComment />
                </section>
            ))} */
}
