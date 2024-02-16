import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { SquaresFour } from "phosphor-react";
import { IoReorderThree } from "react-icons/io5";
import "./NavBar.css";
import { AuthContext } from "../../Pages/Authentication/AuthProvider/Authprovider";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { GiNightSky } from "react-icons/gi";
import { Button } from "keep-react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Swal from "sweetalert2";

// -------------------------speech recognition-------------------

const NavBar = () => {
  const { mode, toggleMode } = useContext(AuthContext);
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");
  const [mic, setMic] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  // console.log("user", user);
  // --------search voice-------------------
  console.log("USERIFO", user);
  // --------search manual---------------
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      //-------------- Trigger  let's just log the query-------------------
      console.log("Search Query:", query);
      if (query === "img to pdf" || query === "image to pdf") {
        navigate("/imgtopdf");
        setQuery("");
      } else if (query === "text to voice" || query === "t to v") {
        navigate("/text");
        setQuery("");
      } else if (
        query === "image edit" ||
        query === "image editing" ||
        query === "img edit" ||
        query === "i e" ||
        query === "img"
      ) {
        navigate("/editimg");
        setQuery("");
      } else if (
        query === "jpeg to png" ||
        query === "jpg to png" ||
        query === "j to p"
      ) {
        navigate("/jpgtopng");
        setQuery("");
      } else if (
        query === "voice to text" ||
        query === "v to t" ||
        query === "speech to text" ||
        query === "s to t"
      ) {
        navigate("/speech");
        setQuery("");
      } else if (
        query === "png to jpg" ||
        query === "p to j" ||
        query === "png to jpeg"
      ) {
        navigate("/pngtojpg");
        setQuery("");
      } else if (
        query === "img to word" ||
        query === "i to w" ||
        query === "image to word"
      ) {
        navigate("/imgToWord");
        setQuery("");
      } else if (
        query === "img resize" ||
        query === "i r" ||
        query === "image resize" ||
        query === "image quality change" ||
        query === "img quality change" ||
        query === "i q c" ||
        query === "img kb change" ||
        query === "image kb change" ||
        query === "i kb c"
      ) {
        navigate("/imagresize");
        setQuery("");
      } else if (
        query === "qr code" ||
        query === "qr code generator" ||
        query === "word to qr" ||
        query === "word to qr code" ||
        query === "qr cd gn"
      ) {
        navigate("/qrcode");
        setQuery("");
      } else if (query === "xl to json" || query === "excel to json") {
        navigate("/exceltojson");
        setQuery("");
      } else if (
        query === "xl to html" ||
        query === "excel to html" ||
        query === "exl to html"
      ) {
        navigate("/exceltohtml");
        setQuery("");
      } else if (
        query === "water mark" ||
        query === "watermark" ||
        query === "watermark remove" ||
        query === "watermark remover"
      ) {
        navigate("/watermark");
        setQuery("");
      } else {
        setQuery("");
        return Swal.fire({
          position: "center",
          icon: "warning",
          title: "Search by Correct word",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

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
      {/* --------about us----------- */}
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
      {/* --------Feature------------------ */}
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
      {/* --------------message--------- */}
      {user ? (
        <li>
          <NavLink
            to="/massage/welcome"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-[#1EEFE9] underline" : ""
            }
          >
            Massage
          </NavLink>
        </li>
      ) : (
        " "
      )}

      {/* -----------------------dashboad----------------- */}
      <li>
        <NavLink
          to="/dashboad/homedes"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#1EEFE9] underline" : ""
          }
        >
          <Button type="success" size="md">
            Dashboad
            <span className="pl-2">
              <SquaresFour size={24} />
            </span>
          </Button>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="relative z-50 w-full text-AllTitle">
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
        {/* -----------------logo image---------- */}
        <div className="text-3xl hidden xl:inline-block">
          <img src="https://i.ibb.co/9v8RZsr/Logo.png" alt="" />
        </div>
        <div className="relative flex items-center gap-4 w-fit h-fit">
          {/* ------------------search button-------- */}

          <div className="relative flex items-center form">
            <input
              className="rounded-full w-full h-10 pl-10 pr-5 text-gray-400 border-none"
              placeholder="Search..."
              type="search"
              name=""
              id="search"
              value={query}
              onChange={handleChange}
              onKeyPress={handleSearch}
            />

            <CiSearch className="absolute text-gray-400 text-2xl left-4" />
          </div>

          {/* ---------------------- Dark-Night------------------------ */}

          <div onClick={toggleMode}>
            {" "}
            <button className="h-12 w-12 rounded-lg p-2 text-3xl">
              {mode ? <GiNightSky /> : <WiDaySunnyOvercast />}
            </button>
          </div>

          {/* -------------------- login/signup ------------------------- */}

          {!user ? (
            <>
              <button className="hidden lg:inline-block">
                <Link to="/login">Login</Link>
              </button>
              <Link to="/signup" className="hidden sm:inline-block">
                <button className="bg-btnBgColor dark:hover:bg-[#E94BFE] text-nowrap text-white text-sm rounded-full px-5 py-2">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => logOut()}
              className="bg-btnBgColor dark:hover:bg-[#E94BFE] text-nowrap text-white text-sm rounded-full px-5 py-2"
            >
              Sign out
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;