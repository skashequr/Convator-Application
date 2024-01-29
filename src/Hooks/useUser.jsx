import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("https://file-convator-backend.vercel.app/user/fetchUsers")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);
  return users;
};

export default useUsers;
