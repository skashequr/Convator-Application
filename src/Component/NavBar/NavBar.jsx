import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import "./NavBar.css";

const NavBar = () => {
  const [drawer, setDrawer] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#bd6363] underline" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Blog"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#FFFFFF] underline" : ""
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Page1"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#FFFFFF] underline" : ""
          }
        >
          Page1
        </NavLink>
      </li>
      <li>
        <div className="group relative transition-all duration-300 ">
          <div className="flex items-center gap-1">
            <button className="dropbtn">Dropdown</button>
            <FaCaretDown  />
          </div>
          <div className="hidden transition-all duration-300 drop-list group-hover:block lg:absolute -left-2 bg-[#dfc7fa] lg:bg-[#E9D5FF] rounded-lg overflow-hidden pt-5 transform skew-y-5">
            <ul>
              {" "}
              <li className="">
                <NavLink
                  to="/Page2"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#FFFFFF] underline"
                      : ""
                  }
                >
                  Page2
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/Page2"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#FFFFFF] underline"
                      : ""
                  }
                >
                  Page2.2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Page2"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#FFFFFF] underline"
                      : ""
                  }
                >
                  Page2.3
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <NavLink
          to="/Page3"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#FFFFFF] underline" : ""
          }
        >
          Page3
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-purple-200 text-sm font-semibold flex px-6 sm:px-10 py-6 justify-between items-center">
      <ul
        className={`py-5 ${
          drawer ? "left-0" : "-left-40"
        } absolute  transition-all duration-300  top-20 w-36 xl:hidden flex flex-col items-center gap-6 bg-purple-200 rounded-br-2xl`}
      >
        {navLinks}
        <button className="">Login</button>
      </ul>
      <div className="text-3xl xl:hidden flex gap-3 items-center transition-all duration-300">
        <IoReorderThree
          onClick={() => setDrawer(!drawer)}
          className="text-3xl xl:hidden"
        />
        Logo
      </div>
      <div className="hidden xl:inline-block">
        <ul className="flex items-center gap-10 ">{navLinks}</ul>
      </div>
      <div className="text-3xl hidden xl:inline-block">Logo</div>
      <div className="relative flex items-center gap-5 w-fit h-fit">
        <div className="relative flex flex-1 items-center ">
          <input
            className="rounded-full hidden sm:inline-block w-full h-10 pl-10 pr-2 text-gray-400 border-none"
            placeholder="Search..."
            type="search"
            name=""
            id=""
          />
          <CiSearch className="absolute hidden sm:inline-block text-2xl left-4" />
        </div>
        <CiSearch className="inline-block sm:hidden text-2xl left-4" />
        <button className="hidden lg:inline-block">Login</button>
        <button className="bg-black hover:bg-zinc-700 text-nowrap text-white text-sm rounded-full px-5 py-2 ">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
