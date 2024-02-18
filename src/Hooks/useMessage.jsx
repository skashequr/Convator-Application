import { useEffect } from "react";
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
      return axiosPublic.get(`/message/${chat_id}`).then((result) => {
        const data = result.data;
        return data;
      });
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      reload();
    }, 600); // Reload every one second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [reload]);

  return [chatMessage, isLoading];
};

export default useMessage;
