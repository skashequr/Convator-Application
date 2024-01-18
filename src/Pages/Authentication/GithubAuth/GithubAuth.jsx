import { Button } from "keep-react";
import useAuth from "../../../Hooks/useAuth";
import { BsGithub } from "react-icons/bs";

const GithubAuth = () => {
  const { signInWithGitHub } = useAuth();
  const HandleloginGithub = () => {
    signInWithGitHub();
  };
  return (
    <div>
      <Button onClick={HandleloginGithub} type="primary" size="sm">
        <span className="pr-2">
          <BsGithub style={{ height: "24px", width: "24px" }}></BsGithub>
        </span>
        Github
      </Button>
    </div>
  );
};

export default GithubAuth;
