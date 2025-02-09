import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { emailStorageAtom, tokenAtom } from "../../jotai/atoms";
import { axiosInstanceExpress } from "../../utils/axiosInstace";

const AccountMenu = () => {
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [email, setEmailStorage] = useAtom(emailStorageAtom);

  const handleSignOut = async () => {
    const data = { email, token };
    const userSignOut = await axiosInstanceExpress.delete("my-token", { data });
    if (userSignOut.status === 204) {
      signOut(auth).then(() => {
        setToken(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
  };

  return (
    <div className="flex items-center gap-2 dropdown dropdown-hover dropdown-end">
      <div className="avatar" tabIndex={0}>
        <div className="w-10 rounded">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="flex flex-col gap-4 dropdown-content absolute top-10 z-30 bg-black text-stone-200 py-2 px-4 rounded-xl">
        <p className="text-sm italic">{email}</p>
        <button
          tabIndex={0}
          onClick={handleSignOut}
          className="hover:text-white transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
