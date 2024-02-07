import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoReorderThree } from "react-icons/io5";
import "./NavBar.css";
import { AuthContext } from "../../Pages/Authentication/AuthProvider/Authprovider";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { GiNightSky } from "react-icons/gi";

const NavBar = () => {
  const { mode, toggleMode } = useContext(AuthContext);
  const [drawer, setDrawer] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#1EEFE9] underline" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#1EEFE9] underline" : ""
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/feateres"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#1EEFE9] underline" : ""
          }
        >
          Feateres
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/massage"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#1EEFE9] underline" : ""
          }
        >
          Massage
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="relative z-50 w-full text-white">
      <nav className="backdrop-blur-lg bg-slate-700 bg-opacity-20 w-full fixed text-sm font-semibold flex px-3 sm:px-10 py-2 sm:py-6 justify-between items-center">
        <ul
          className={`py-5 ${
            drawer ? "left-0" : "-left-40"
          } absolute  transition-all duration-300 top-[80px] sm:top-[120px] w-36 xl:hidden flex flex-col items-center gap-6  rounded-br-2xl backdrop-blur-3xl bg-slate-700 bg-opacity-40`}
        >
          {navLinks}
          <button className="">
            <Link to="/login">Login</Link>
          </button>
          <button className="">
            <Link to="/signup">Sign Up</Link>
          </button>
        </ul>
        <div className="xl:hidden flex gap-3 items-center transition-all duration-300">
          <div className="w-fit">
            <IoReorderThree
              onClick={() => setDrawer(!drawer)}
              className="text-4xl xl:hidden"
            />
          </div>
          <img
            className="mr-4 w-10 inline-block"
            src="https://i.ibb.co/9v8RZsr/Logo.png"
            alt=""
          />
        </div>
        <div className="hidden xl:inline-block">
          <ul className="flex items-center gap-10 ">{navLinks}</ul>
        </div>
        <div className="text-3xl hidden xl:inline-block">
          <img src="https://i.ibb.co/9v8RZsr/Logo.png" alt="" />
        </div>
        <div className="relative flex items-center gap-4 w-fit h-fit">
          <div className="relative flex items-center ">
            <input
              className="rounded-full  w-full h-10 pl-10 pr-2 text-gray-400 border-none"
              placeholder="Search..."
              type="search"
              name=""
              id=""
            />
            <CiSearch className="absolute text-gray-400 text-2xl left-4" />
          </div>
          <div onClick={toggleMode}>
            {" "}
            <button className="h-12 w-12 rounded-lg p-2 text-3xl">
              {mode ? <GiNightSky /> : <WiDaySunnyOvercast />}
            </button>
          </div>
          <button className="hidden lg:inline-block">
            <Link to="/login">Login</Link>
          </button>
          <Link to="/signup" className="hidden sm:inline-block">
            <button className="bg-btnBgColor  dark:hover:bg-[#E94BFE] text-nowrap text-white text-sm rounded-full px-5 py-2 ">
              Signup Now
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
