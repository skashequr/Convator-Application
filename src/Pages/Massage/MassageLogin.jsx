import React, { useState } from "react";
import logo from "../../assets/Logo.png";
// import { Button } from "keep-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Toaster from "./Toaster";
import { FaRegUserCircle } from "react-icons/fa";
function MassageLogin() {
  const [showlogin, setShowLogin] = useState(false);
  // const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(data);
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const data = { name: userName, password };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/user/login/",
        data,
        config
      );
      console.log("Login : ", response);

      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);

      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/massage/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }

    setLoading(false);
  };

  const signUpHandler = async (e) => {
    setLoading(true);
    event.preventDefault();
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const data = { name: userName, password, email };
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/user/register",
        data,
        config
      );
      console.log(response);
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/massage/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setLogInStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setLogInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container  w-full mx-auto lg:w-[500px] drop-shadow-lg  ">
        {showlogin && (
          // ----------------login ----------------
          <div className="flex flex-col  w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-centermb-6 mt-40 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
              Login your Account
            </div>
            <div className="mt-8">
              <form onSubmit={loginHandler}>
                <div className="flex flex-col mb-2">
                  <div className="flex flex-col mb-2">
                    <div className="flex relative ">
                      <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <FaRegUserCircle></FaRegUserCircle>
                      </span>
                      <input
                        type="text"
                        name="userName"
                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Your password"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="sign-in-email"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your password"
                    />
                  </div>
                </div>

                <div className="flex items-center mb-6 -mt-4">
                  <p>
                    Dont have an Account ?{" "}
                    <span
                      className="hyper"
                      onClick={() => {
                        setShowLogin(false);
                      }}
                    >
                      Sign Up
                    </span>
                  </p>
                  {logInStatus ? "react tost" : null}
                </div>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Login now
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
              >
                <span className="ml-2">You don&#x27;t have an account?</span>
              </a>
            </div>
          </div>
        )}

        {/*------------ -------signup part--------- --------*/}

        {!showlogin && (
          <div className="flex flex-col w-full   max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
              SignUp To New Account
            </div>
            <div className="mt-8">
              <form onSubmit={signUpHandler}>
                <div className="flex flex-col mb-2">
                  <div className="flex flex-col mb-2">
                    <div className="flex relative ">
                      <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <FaRegUserCircle></FaRegUserCircle>
                      </span>
                      <input
                        type="text"
                        id="sign-in-email"
                        name="userName"
                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Your password"
                      />
                    </div>
                  </div>
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      id="sign-in-email"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="sign-in-email"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your password"
                    />
                  </div>
                </div>

                <div className="flex items-center mb-6 -mt-4">
                  <p>
                    Already have an Account ?
                    <span
                      className="hyper"
                      onClick={() => {
                        setShowLogin(true);
                      }}
                    >
                      Log in
                    </span>
                  </p>
                  {signInStatus ? " React tost" : null}
                </div>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Regester now
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
              >
                <span className="ml-2">You don&#x27;t have an account?</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MassageLogin;
