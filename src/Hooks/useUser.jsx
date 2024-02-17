import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user/fetchUsers")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);
  return users;
};

export default useUsers;
