import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      navigate(`/${uid}`);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 font-sans">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-[6px] border-black/30 shadow-2xl rounded-[50px] p-10 md:p-14">
        <h2 className="text-[48px] md:text-[60px] text-black/30 uppercase mb-10">
          Login/signup
        </h2>
        <div className="flex justify-center flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-transparent border-[5px] border-black/30 shadow-xl text-white text-xl font-bold px-6 py-3 rounded-full uppercase hover:border-white transition-all duration-300"
          >
            Sign in with Google
          </button>

          <div className="center gap-2">
            <Link to="/">continue without saving</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
