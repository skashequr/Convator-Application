import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaymentUserCount = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: allPaymentUserCounts = [],
    refetch: allPaymentUserCountsReload,
    isLoading,
  } = useQuery({
    queryKey: [`allPaymentUserCounts`],
    queryFn: () => {
      const res = axiosPublic.get("/payment/all-count").then((result) => {
        const data = result.data;
        return data;
      });
      console.log("result allPaymentUserCounts", res);
      return res;
    },
  });
  return [allPaymentUserCounts, allPaymentUserCountsReload, isLoading];
};

export default usePaymentUserCount;
