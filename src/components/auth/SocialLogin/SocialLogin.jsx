import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import Button from "../../common/Button";

const SocialLogin = ({
  onGoogleLogin,
  onGithubLogin,
}) => {
  return (
    <div className="space-y-4">

      <div className="flex items-center">
        <div className="h-px flex-1 bg-gray-300" />

        <span className="mx-4 text-sm text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <Button
        variant="outline"
        fullWidth
        leftIcon={<FcGoogle size={20} />}
        onClick={onGoogleLogin}
      >
        Continue with Google
      </Button>

      <Button
        variant="outline"
        fullWidth
        leftIcon={<FiGithub size={20} />}
        onClick={onGithubLogin}
      >
        Continue with GitHub
      </Button>

    </div>
  );
};

export default SocialLogin;