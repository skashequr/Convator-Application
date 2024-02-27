import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import axios from "axios";

const useAdmin = () => {
  const { user, loading } = useAuth();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      console.log("asking or checking is admin", user);
      const res = await axios(
        "https://file-convator-backend.vercel.app/user/findAdmine"
      );

      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
