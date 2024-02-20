import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaymentList = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: allPaymentList = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`allPaymentList`],
    queryFn: () => {
      const res = axiosPublic.get("/payment/all-pay-list").then((result) => {
        const data = result.data;
        return data;
      });
      console.log("result allPaymentList", res);
      return res;
    },
  });
  return [allPaymentList, reload, isLoading];
};

export default usePaymentList;
