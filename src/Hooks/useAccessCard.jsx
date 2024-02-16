import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAccessCard = () => {
  const axiosPublic = useAxiosPublic([]);

  const {
    data: allAccessCard = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`allAccessCard`],
    queryFn: () => {
      const res = axiosPublic.get("/access-card").then((result) => {
        const data = result.data.accessCards;
        return data;
      });
      console.log("result", res);
      return res;
    },
  });
  return [allAccessCard, reload, isLoading];
};

export default useAccessCard;
