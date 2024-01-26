import React, { useState } from "react";
import logo from "../../assets/Logo.png";
// import { Button } from "keep-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Toaster from "./Toaster";
import { FaRegUserCircle } from "react-icons/fa";
function MassageLogin() {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    console.log(data);
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
    const data = {name: userName , password , email};
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
      <div className="login-container mt-6 w-full mx-auto lg:w-[500px] drop-shadow-lg  ">
        <div className="image-container  items-center justify-center ">
          <img src={logo} alt="Logo" className="welcome-logo ml-[40%]" />
        </div>
        {showlogin && (
          // ----------------login ----------------
          <div className="login-box p-12 w-full mx-auto lg:w-[500px] drop-shadow-lg ">
            <p className="login-text backdrop-blur-sm text-4xl pb-8">
              Login to your Account
            </p>

            <div className="space-y-5">
              {/* ----------name------ */}
              <label htmlFor="email" className="block">
                User-Name
              </label>
              <div className="relative">
                <input
                  onChange={changeHandler}
                  id="standard-basic"
                  label="Enter User Name"
                  color="secondary"
                  name="name"
                  className="p-3 block w-full pl-10 drop-shadow-lg outline-none"
                  onKeyDown={(event) => {
                    if (event.code == "Enter") {
                      // console.log(event);
                      loginHandler();
                    }
                  }}
                />
                <span className="absolute top-1/4 left-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="inline-block w-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z"
                        fill="#000000"
                      ></path>
                      <rect
                        x="2.5"
                        y="2.5"
                        width="19"
                        height="19"
                        rx="3.5"
                        stroke="#000000"
                      ></rect>
                    </g>
                  </svg>
                </span>
              </div>
              {/*------- password ------- */}
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">Well done!</span> Some success
                message.
              </p>
              <label htmlFor="password" className="block">
                Password
              </label>
              <div className="relative">
                <input
                  className="p-3 block w-full pl-10 drop-shadow-lg outline-none"
                  onChange={changeHandler}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  placeholder="enter your passwword"
                  autoComplete="current-password"
                  color="secondary"
                  name="password"
                  onKeyDown={(event) => {
                    if (event.code == "Enter") {
                      // console.log(event);
                      loginHandler();
                    }
                  }}
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  // placeholder="enter your passwword"
                />
                <span className="absolute top-1/4 left-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="inline-block w-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M20.9098 11.1203V6.73031C20.9098 5.91031 20.2898 4.98031 19.5198 4.67031L13.9498 2.39031C12.6998 1.88031 11.2898 1.88031 10.0398 2.39031L4.46984 4.67031C3.70984 4.98031 3.08984 5.91031 3.08984 6.73031V11.1203C3.08984 16.0103 6.63984 20.5903 11.4898 21.9303C11.8198 22.0203 12.1798 22.0203 12.5098 21.9303C17.3598 20.5903 20.9098 16.0103 20.9098 11.1203ZM12.7498 12.8703V15.5003C12.7498 15.9103 12.4098 16.2503 11.9998 16.2503C11.5898 16.2503 11.2498 15.9103 11.2498 15.5003V12.8703C10.2398 12.5503 9.49984 11.6103 9.49984 10.5003C9.49984 9.12031 10.6198 8.00031 11.9998 8.00031C13.3798 8.00031 14.4998 9.12031 14.4998 10.5003C14.4998 11.6203 13.7598 12.5503 12.7498 12.8703Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
              {/* ------submit button---- */}
              {/* <Button onClick={loginHandler} size="md" type="outlinePrimary">
                Login now
              </Button> */}
              <button
                onClick={loginHandler}
                type="button"
                className="py-2 px-5 mb-4 mt-6 shadow-lg before:block before:-left-1 before:-top-1 before:bg-black before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%]  before:duration-500 before:-z-40 after:block after:-right-1 after:-bottom-1 after:bg-black after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%]
                after:duration-500 after:-z-40 bg-white relative inline-block"
              >
                Login now
              </button>
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> Some error
                message.
              </p>

              <p>
                Dont have an Account ?{" "}
                <span
                  className="hyper text-green-600"
                  onClick={() => {
                    setShowLogin(false);
                  }}
                >
                  Sign Up
                </span>
              </p>
              {logInStatus
                ? //   <Toaster key={logInStatus.key} message={logInStatus.msg} />
                  "fy"
                : null}
            </div>
          </div>
        )}

        {/*------------ -------signup part--------- --------*/}

        {!showlogin && (
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
              Login To Your Account
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
                  <div className="flex ml-auto">
                    <a
                      href="#"
                      className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                    >
                      Forgot Your Password?
                    </a>
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Login
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
