import { CgProfile } from "react-icons/cg";
import { IoPersonAddSharp, IoAddCircleOutline } from "react-icons/io5";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiNightSky } from "react-icons/gi";
import { useContext, useEffect, useRef, useState } from "react";
import { FiSunrise } from "react-icons/fi";
import { AuthContext } from "../Authentication/AuthProvider/Authprovider";
import axios from "axios";
// import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const SideBar = () => {
  const [night, setNight] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setQuery] = useState("");
  const { singleUser } = useContext(AuthContext);
  // fetch user

  // const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(`https://file-convator-backend.vercel.app/user/infinityScrolling?page=${page}`)
  //     .then(response => {
  //       setItems(prevItems => [...prevItems, ...response.data]);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching items:', error);
  //       setLoading(false);
  //     });
  // }, [page]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!singleUser || !singleUser._id) {
        // If singleUser or its _id property is not available, exit early
        return;
      }

      try {
        const response = await fetch(
          `https://file-convator-backend.vercel.app/chat/chat?userId=${singleUser._id}&page=${page}&searchQuery=${searchQuery}`
        );

        if (!response.ok) {
          // Check if the response is not successful (e.g., 404 or 500 error)
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data); // Assuming the response is an array of user objects
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [singleUser, page, searchQuery]);
  return (
    <div>
      <div className="flex justify-between bg-slate-300 rounded-full">
        <CgProfile className="w-9 h-8 m-6" />
        <div className="flex justify-around">
          <Link to="/massage/users">
            <IoPersonAddSharp className="w-9 h-8 m-6"></IoPersonAddSharp>
          </Link>
          <Link to="/massage/groups">
            <FaUserFriends className="w-9 h-8 m-6"></FaUserFriends>
          </Link>
          <Link to="/massage/create-groups">
            <IoAddCircleOutline className="w-9 h-8 m-6"></IoAddCircleOutline>
          </Link>
          <Link onClick={() => setNight(!night)}>
            {night ? (
              <GiNightSky className="w-9 h-8 m-6" />
            ) : (
              <FiSunrise className="w-9 h-8 m-6" />
            )}
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchQuery}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full  rounded-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <FaSearch className=" absolute end-2.5 h-8 w-8 bottom-2.5 rounded-lg "></FaSearch>
          </div>
        </form>
        {/* heare add scroling */}
        <div ref={containerRef} style={{ height: "300px", overflow: "auto" }}>
          {users ? (
            <div>
              {users?.map((user) => (
                <Link
                  to={`/massage/users/massage/shearefile/${user?.users[1]?._id}`}
                  key={user._id}
                >
                  <div className="flex items-center gap-4 w-full mt-3 p-8 rounded-2xl hover:bg-[#a2d1f7] bg-[#F1F2F3]">
                    <div className="h-10 w-10 hover:h-14 hover:w-14">
                      <img
                        className="h-full w-full rounded-full object-cover object-center ring ring-white"
                        src="https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg"
                        alt={`Profile of ${user?.name}`}
                      />
                    </div>
                    <div className="font-medium dark:text-white">
                      <div className="hover:text-white">
                        {user?.users[1]?.name}
                      </div>
                      <div className="text-sm dark:text-gray-400">
                        Joined in {user?.email}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        {/* 2  user*/}
        <div></div>
      </div>
    </div>
  );
};

export default SideBar;
