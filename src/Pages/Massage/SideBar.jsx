import { CgProfile } from "react-icons/cg";
import { IoPersonAddSharp, IoAddCircleOutline } from "react-icons/io5";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiNightSky } from "react-icons/gi";
import { WiNightAltCloudyWindy } from "react-icons/wi";
import { useState } from "react";
import { FiSunrise } from "react-icons/fi";
const SideBar = () => {
  const [night, setNight] = useState(false);
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
              className="block w-full  rounded-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <FaSearch className=" absolute end-2.5 h-8 w-8 bottom-2.5 rounded-lg "></FaSearch>
          </div>
        </form>
        {/*---------------- user--------- */}
        <div>
          <Link to="/massage/:massa">
            <div>
              <div className="flex items-center gap-4 w-full mt-3 p-8 rounded-2xl  hover:bg-[#a2d1f7] bg-[#F1F2F3]">
                <div className="h-10 w-10 hover:h-14 hover:w-14">
                  <img
                    className="h-full w-full rounded-full object-cover object-center ring ring-white"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="font-medium dark:text-white">
                  <div className="hover:text-white">Jese Leos</div>
                  <div className="text-sm  dark:text-gray-400">
                    Joined in August 2014
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* 2 */}
          <div>
            <div className="flex items-center gap-4 w-full mt-3 p-8 hover:bg-[#a2d1f7] bg-[#F1F2F3]">
              <div className="h-10 w-10 hover:h-14 hover:w-14">
                <img
                  className="h-full w-full rounded-full object-cover object-center ring ring-white"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="font-medium dark:text-white">
                <div className="hover:text-white">Jese Leos</div>
                <div className="text-sm  dark:text-gray-400">
                  Joined in August 2014
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
