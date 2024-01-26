import { Controls, Player } from "@lottiefiles/react-lottie-player";
import logo from "../../assets/Logo.png";
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
    <div>
      <img src={logo} alt="Logo" className="welcome-logo" />
      <b>Hi , 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
      <div>
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
    </div>
  );
}

export default WelcomeMassage;
