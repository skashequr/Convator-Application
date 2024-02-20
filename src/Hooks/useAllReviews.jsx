import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllReviews = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: allReviews = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`allReviews`],
    queryFn: () => {
      const res = axiosPublic.get("/users-review").then((result) => {
        const data = result.data.SearchDates;
        return data;
      });
      //   console.log("result allPaymentUser", res);
      return res;
    },
  });
  return [allReviews, reload, isLoading];
};

export default useAllReviews;
