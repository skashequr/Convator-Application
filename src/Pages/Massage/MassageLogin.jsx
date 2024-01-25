import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import { Button } from "keep-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Toaster from "./Toaster";

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
    
      const response = await axios.post("http://localhost:5000/user/login/", data, config);
      
      console.log("Login : ", response);
      
      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({ msg: "Invalid User name or Password", key: Math.random() });
    }
    
    setLoading(false);
  };


  const signUpHandler = async () => {
    setLoading(true);
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
      navigate("/app/welcome");
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
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        {showlogin && (
          <div className="login-box">
            <p className="login-text">Login to your Account</p>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Your name
              </label>
              <input
                onChange={changeHandler}
                id="standard-basic"
                label="Enter User Name"
                color="secondary"
                name="name"
                onKeyDown={(event) => {
                  if (event.code == "Enter") {
                    // console.log(event);
                    loginHandler();
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter your email"
              />
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">Well done!</span> Some success
                message.
              </p>
            </div>
            <div>
              <input
                onChange={changeHandler}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                color="secondary"
                name="password"
                onKeyDown={(event) => {
                  if (event.code == "Enter") {
                    // console.log(event);
                    loginHandler();
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter your passwword"
              />
              <Button onClick={loginHandler} size="md" type="outlinePrimary">
                Outline Primary
              </Button>
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> Some error
                message.
              </p>
            </div>

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
            {logInStatus
              ? //   <Toaster key={logInStatus.key} message={logInStatus.msg} />
                "fy"
              : null}
          </div>
        )}
        {!showlogin && (
          <div className="login-box">
            <p className="login-text">Create your Account</p>

            <input
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              color="secondary"
              name="name"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter your passwword"
            />

            <input
              onChange={changeHandler}
              id="standard-basic"
              label="Enter Email Address"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter your passwword"
            />

            <input
                onChange={changeHandler}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                color="secondary"
                name="password"
                onKeyDown={(event) => {
                  if (event.code == "Enter") {
                    // console.log(event);
                    signUpHandler();
                  }
                }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter your passwword"
            />
            
            <Button
              variant="outlined"
              color="secondary"
              onClick={signUpHandler}
            >
              Sign Up
            </Button>
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
            {signInStatus
              ? //   <Toaster key={signInStatus.key} message={signInStatus.msg} />
                "fgyrf"
              : null}
          </div>
        )}
      </div>
    </>
  );
}

export default MassageLogin;
