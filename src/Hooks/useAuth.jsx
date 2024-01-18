import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider/Authprovider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
