import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Card } from "keep-react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useState } from "react";
import Googlelogin from "../GoogleLogin/Googlelogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GithubAuth from "../GithubAuth/GithubAuth";
import { Helmet } from "react-helmet-async";
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [showlogin, setShowLogin] = useState(false);
  // const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = useState("");
  const { signIn } = useAuth();
  // -----location state-------
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);
  const HandeLogin = async (e) => {
    // -----------------loading off-----------------------------//
    e.preventDefault();

    // setLoading(true);

    // setLoading(false);
    console.log(e.currentTarget);
    const email = e.target.email.value;
    // const userName = e.target.userName.value;
    const password = e.target.password.value;
    const data = { password };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "https://file-convator-backend.vercel.app/user/login/",
        data,
        config
      );
      console.log("Login : ", response);

      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);

      localStorage.setItem("userData", JSON.stringify(response));
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    signIn(email, password)
      .then((result) => {
        console.log(result.user);

        if (result.user.email) {
          Swal.fire("Login success!", "Welcome to my Website", "success");
        }
        navigate(from, { replace: true });
      })

      .catch((error) => {
        console.error(error);
        Swal.fire("Login failed", "Email or password is incorrect", "error");
      });
  };
  return (
    <div className="pt-28">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-w-screen min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div className="md:flex w-full">
            {/* ------------image part------------ */}
            <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
              {/* --------- lottie animatim add ------------------*/}
              <Player
                autoplay
                loop
                src="https://lottie.host/9bc9c81e-9fad-4452-86d4-6bbe388678cb/ech29NQ22U.json"
                style={{ height: "450px", width: "350px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
            </div>
            {/* ------login part------- */}
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">
                  Login now our conveter
                </h1>
              </div>

              {/* ------------ form----------*/}
              <form onSubmit={HandeLogin}>
                <div>
                  {/*----------------- social login---------- */}
                  <Card.Container className="circled mx-auto flex items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
                    <Googlelogin />
                    <GithubAuth />
                  </Card.Container>
                  {/* ----------- email ------------- */}
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="email"
                          name="email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="xyz@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  {/*------------- password------ */}
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                          required
                        ></input>
                        <span
                          className="mt-3 relative -ml-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <BsEyeSlashFill></BsEyeSlashFill>
                          ) : (
                            <BsEyeFill></BsEyeFill>
                          )}
                        </span>
                      </div>
                      {/*--------- forgot password--------- */}
                      <label className="label">
                        <a href="#" className="label-text-alt link link-hover">
                          Forgot password?
                        </a>
                      </label>
                    </div>
                  </div>

                  <div className="flex -mx-3">
                    {/* --------button------- */}
                    <div className="w-full px-3 mb-5">
                      <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                        Login NOW
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* form end */}
              <p className="px-6">
                <small>
                  Already have not an account Please {""}
                  <Link className="text-blue-800" to="/signup">
                    Signup
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
