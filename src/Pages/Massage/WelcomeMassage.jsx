import { Controls, Player } from "@lottiefiles/react-lottie-player";
import logo from "../../assets/Logo.png";

import SideBar from "./SideBar";
// import { useNavigate } from "react-router-dom";
// https://lottie.host/846ceeae-80e9-47c1-bc60-39744eb51028/ijraZh5gyz.json
function WelcomeMassage() {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(userData);
  //   const nav = useNavigate();
  //   if (!userData) {
  //     console.log("User not Authenticated");
  //     nav("/");
  //   }

  return (
    <div className=" flex col-span-12 bg-[#F1F2F7] gap-4 pt-28">
      {/* --------sidebar------------ */}
      <div className="col-span-4 p-4 ml-2 rounded-2xl h-full bg-[#FFFFFF]">
        <SideBar></SideBar>
      </div>

      {/* --------------- other part*/}
      <div className="col-span-8 sm:mb-10 lg:grid lg:grid-cols-5 md:grid-cols-none md:bg-gray-300 bg-gray-300 lg:bg-white h-full">
        <div className="px-10 py-10 max-w-md m-auto lg:col-span-2 mt-20 mb-20 shadow-xl rounded-xl lg:mt-10 md:shadow-xl md:rounded-xl lg:shadow-none lg:rounded-none lg:w-full lg:mb-10 lg:px-5 lg:pt-5 lg:pb-5 lg:max-w-lg bg-white">
          <img src={logo} alt="Logo" className="text-center items-center" />
          <b>Hi , there 👋</b>
          <p className="text-center">
            However, your request is a bit vague. There are many messaging apps
            available, and each may have different features, capabilities, and
            details.
          </p>
        </div>
        <div className=" relative lg:block  lg:col-span-3">
          {/* --------- lottie animatim add ------------------*/}
          <Player
            autoplay
            loop
            src="https://lottie.host/846ceeae-80e9-47c1-bc60-39744eb51028/ijraZh5gyz.json"
            style={{ height: "450px", width: "350px" }}
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default WelcomeMassage;
