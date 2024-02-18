import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSearchDates = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: allSearchData = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`allSearchData`],
    queryFn: () => {
      const res = axiosPublic.get("/search").then((result) => {
        const data = result.data.SearchDates;
        return data;
      });
      //   console.log("result allPaymentUser", res);
      return res;
    },
  });
  return [allSearchData, reload, isLoading];
};

export default useSearchDates;
