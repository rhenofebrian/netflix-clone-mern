import { GoChevronLeft } from "react-icons/go";
import { JUMBOTRON_IMAGE } from "../constants/listAsset";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { emailAtom } from "../jotai/atoms";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [, setPassword] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("login success!");
  };

  return (
    <div>
      <img
        src={JUMBOTRON_IMAGE}
        className="image-full h-[100vh] object-cover brightness-40"
      />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 px-8 py-16 rounded-xl bg-black/80 max-w-xl w-full">
        <form className="flex flex-col gap-4">
          <div className="text-white text-xl font-semibold mb-2 flex items-center gap-2">
            <GoChevronLeft
              onClick={() => navigate("/")}
              size={28}
              className="text-slate-200 hover:text-white cursor-pointer "
            />
            Sign In
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full p-4 text-white bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-md"
            />
            <label className="text-white absolute -z-10 bottom-0 top-3 left-0 pl-4 peer-placeholder-shown:top-4 peer-focus:top-[1px] peer-focus:text-sm transition-all ">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className=" w-full p-4 text-white bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-md"
            />
            <label className="text-white absolute -z-10 bottom-0 top-3 left-0 pl-4 peer-placeholder-shown:top-4 peer-focus:top-[1px] peer-focus:text-sm transition-all ">
              Password
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogin}
              className="bg-red-500 py-3 w-full text-white font-bold rounded-md"
            >
              Sign In
            </button>
            <p className="text-white">
              Don&apos;t have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 underline cursor-pointer ml-2"
              >
                Sign Un Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
