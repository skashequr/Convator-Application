import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: users = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`users`],
    queryFn: () => {
      const res = axiosPublic.get("/user/fetchUsers").then((result) => {
        const data = result.data;
        return data;
      });
      //   console.log("result allPaymentUser", res);
      return res;
    },
  });
  return [users, reload, isLoading];
};

export default useUsers;
