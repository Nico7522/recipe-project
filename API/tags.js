import { useQuery, useQueryClient } from "react-query";
import { fetchTags } from "./FETCH/fetch-tags";

export const useFetchTags = () => {
    const queryClient = useQueryClient();
    return useQuery({ queryKey: ["Tags"], queryFn: fetchTags });
  };