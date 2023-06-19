import { useQuery, useQueryClient } from "react-query";
import { fetchTags } from "./FETCH/fetch-tags";
const URL_API = import.meta.env.VITE__URL_API;

export const useFetchTags = () => {
    const queryClient = useQueryClient();
    return useQuery({ queryKey: ["Tags"], queryFn: fetchTags });
  };