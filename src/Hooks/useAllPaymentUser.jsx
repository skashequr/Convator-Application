import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPaymentUser = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: allPaymentUser = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`allPaymentUser`],
    queryFn: () => {
      const res = axiosPublic.get("/payment").then((result) => {
        const data = result.data.allPayment;
        return data;
      });
      // console.log("result allPaymentUser", res);
      return res;
    },
  });
  return [allPaymentUser, reload, isLoading];
};

export default useAllPaymentUser;
