
import logo from "../../assets/Logo.png";
// import { useNavigate } from "react-router-dom";

function WelcomeMassage() {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   console.log(userData);
//   const nav = useNavigate();
//   if (!userData) {
//     console.log("User not Authenticated");
//     nav("/");
//   }

  return (
    <div >
      <img
        src={logo}
        alt="Logo"
        className="welcome-logo"
      />
      <b>Hi , 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
}

export default WelcomeMassage;