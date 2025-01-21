import { useNavigate } from "react-router-dom";
import { DefaultButton } from "./Modules/DefaultButton";
import { OptionLanguage } from "./Modules/OptionLanguage";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="relative z-20">
      <nav className=" flex flex-wrap justify-between items-center pr-8 pl-7 py-4">
        <div>
          <img
            src="/netflix-logo-icon.png"
            width={105}
            height={45}
            alt="netflix-logo"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <OptionLanguage />
          <DefaultButton text={"Sign In"} onClick={() => navigate("/login")} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
