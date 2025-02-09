import { useAtom } from "jotai";
import { auth } from "../utils/firebase";
import Loading from "./Modules/Loading";
import Navbar from "./Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { emailStorageAtom, tokenAtom } from "../jotai/atoms";

export const DefaulLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);

  if (loading) return <Loading />;
  if (error) return <p>error.</p>;
  if (user && emailStorage && tokenStorage) return location.replace("/browse");

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
