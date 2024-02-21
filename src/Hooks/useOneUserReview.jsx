import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider/Authprovider";

const useOneUserReview = () => {
  const axiosPublic = useAxiosPublic();
  const { reviewerEmail } = useContext(AuthContext);

  const {
    data: oneUserReview,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["oneUserReview", reviewerEmail],
    queryFn: () => {
      const res = axiosPublic
        .get(`/users-review/user?email=${reviewerEmail}`)
        .then((result) => {
          const data = result.data.userReviews;
          return data;
        });
      return res;
    },
  });

  return [oneUserReview, refetch, isLoading];
};

export default useOneUserReview;
