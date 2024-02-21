import { useState, useEffect, useContext } from "react";
import usePaymentList from "./usePaymentList";
import useUsers from "./useUser";
import { AuthContext } from "../Pages/Authentication/AuthProvider/Authprovider";

function useUserConvertLimit() {
  const [currentUserConvertLimit, setCurrentUserConvertLimit] = useState();
  const [matchPaidStatus, setMatchPaidStatus] = useState(false);
  const [allPaymentList] = usePaymentList();
  const [users, reload] = useUsers();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const currentUser = users?.filter(
      (matchUser) => matchUser?.email === user?.email
    );
    const currentUserPayment = allPaymentList?.filter(
      (matchUser) => matchUser?.cus_email === user?.email
    );
    setCurrentUserConvertLimit(currentUser[0]?.ConvertLimit);
    setMatchPaidStatus(currentUserPayment[0]?.paidStatus);
  }, [user, users, allPaymentList]);

  const updateValue = currentUserConvertLimit - 1;

  return {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  };
}

export default useUserConvertLimit;
