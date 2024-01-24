import { Button } from "keep-react";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Googlelogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handlesignwithGoogle = () => {
    signInWithGoogle();
  };
  navigate("/");

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <Button onClick={handlesignwithGoogle} type="primary" size="sm">
          <span className="pr-2">
            <FcGoogle style={{ height: "24px", width: "24px" }}></FcGoogle>
          </span>
          Google
        </Button>
      </div>
    </div>
  );
};
export default Googlelogin;
