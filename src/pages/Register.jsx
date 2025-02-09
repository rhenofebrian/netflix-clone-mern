import { GoChevronLeft } from "react-icons/go";
import { JUMBOTRON_IMAGE } from "../constants/listAsset";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { emailAtom } from "../jotai/atoms";
import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { DefaulLayout } from "../components/DefaultLayout";
import { axiosInstanceExpress } from "../utils/axiosInstace";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (register) {
        await signOut(auth);
        const addUser = await axiosInstanceExpress.post("sign-up", {
          email,
          password,
        });
        if (addUser.status === 201) {
          toast("register success");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    } catch (err) {
      toast(err.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <DefaulLayout>
      <img
        src={JUMBOTRON_IMAGE}
        className="w-full h-[100vh] object-cover brightness-40"
      />
      <ToastContainer position="top-center" theme="dark" autoClose={2000} />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 px-8 py-16 rounded-xl bg-black/80 max-w-xl w-full">
        <form className="flex flex-col gap-4">
          <div className="text-white text-xl font-semibold mb-2 flex items-center gap-2">
            <GoChevronLeft
              onClick={() => navigate("/")}
              size={28}
              className="text-slate-200 hover:text-white cursor-pointer "
            />
            Sign Up
          </div>
          <div className="relative w-full">
            <input
              type="email"
              placeholder="email"
              value={email ? email : ""}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full p-4 text-white bg-black/50 rounded-md border border-white/50 placeholder-transparent text-md focus:border-white transition-all"
            />
            <label
              className={`absolute text-white left-4 transition-all ${
                email
                  ? "top-[1px] text-sm"
                  : "top-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-md"
              } peer-focus:top-[1px] peer-focus:text-sm -z-10`}
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" w-full p-4 text-white bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-md"
            />
            <label
              className={`absolute text-white left-4 transition-all ${
                password
                  ? "top-[1px] text-sm"
                  : "top-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-md"
              } peer-focus:top-[1px] peer-focus:text-sm -z-10`}
            >
              Password
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="bg-red-500 py-3 w-full text-white font-bold rounded-md disabled:bg-red-400 disabled:cursor-wait"
            >
              Sign Up
            </button>
            <p className="text-white">
              Already Have an Account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 underline cursor-pointer ml-2"
              >
                Sign In Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </DefaulLayout>
  );
};

export default Register;
