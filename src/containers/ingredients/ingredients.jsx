import { useInfiniteQuery } from "react-query";
import Title from "../../components/title/title";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import IngredientDisplay from "../../components/ingredients/ingredients-display";
import axios from "axios";
import Loader from "../../components/loader/loader";
import SearchBar from "../../components/ingredients/searchbar";
import { useState } from "react";
import qs from "qs";
import Button from "../../components/button";
const URL_API = import.meta.env.VITE__URL_API;

export default function Ingredients() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigation = useNavigate();
  const { ref, inView } = useInView();
  const [ingredient, setIngredient] = useState("");
  const nav = useNavigate()
  const handleIngredient = (search) => {
    let params = qs.stringify({ ingredient: search });

    setIngredient(search);
    setSearchParams(params);
  };
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
    ["Ingredients", { ingredient: ingredient }],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `${URL_API}/ingredient?page=${pageParam}`,
        {
          params: { ingredient: ingredient },
          paramsSerializer: (param) => {
            return qs.stringify(param);
          },
        }
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
    return <div className="customloader"></div>;
  }
  if (error) {
    return <p>{error.response.data}</p>;
  }

  return (
    <div className="flex flex-col w-full  m-auto">
      <div className="flex flex-row justify-around mb-2">
        <SearchBar
          ingredient={ingredient}
          handleIngredient={handleIngredient}
          className={'order-1'}
        />
        <Title text={"All ingredients"} className={'order-2'} />
        <Button text={"Post new ingredient"} onClick={() => nav('/ingredients/create')} className={'order-3'} />
      </div>
      <div className="m-auto w-4/5 text-cnter bg-white">
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex} className="w-full gap-1 flex-wrap flex flex-row mt-1" >
          {page.results.map((ingredient) => (
            <IngredientDisplay key={ingredient.id} {...ingredient} />
          ))}
        </div>
      ))}
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      ></button>

      </div>
      {isFetching && <Loader className="flex justify-center" />}
    </div>
  );
}
