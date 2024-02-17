import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../Pages/Authentication/AuthProvider/Authprovider";
import { useContext } from "react";

const useMessage = () => {
  const axiosPublic = useAxiosPublic([]);
  const { chat_id } = useContext(AuthContext);

  const {
    data: chatMessage = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`chatMessage`],
    queryFn: () => {
      const res = axiosPublic.get(`/message/${chat_id}`).then((result) => {
        const data = result.data;
        return data;
      });
      console.log("result chatMessage", res);
      return res;
    },
  });
  return [chatMessage, reload, isLoading];
};

export default useMessage;
