import { LIST_NAVBAR } from "../../constants/listNavbar";
import { EachUtils } from "../../utils/EachUtils";
import AccountMenu from "./AccountMenu";
import InputSearchMovies from "./InputSearchMovies";

const BrowseNavbar = () => {
  return (
    <header>
      <nav className="bg-[#141414] fixed  top-0 left-0 px-8 w-full z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/netflix-logo-icon.png" className="w-[120px] ml-2" />
            <ul className="sm:flex hidden items-center gap-4 text-white">
              <EachUtils
                of={LIST_NAVBAR}
                render={(item, index) => (
                  <li key={index}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                )}
              />
            </ul>
          </div>
          <div className="flex items-center gap-4 text-white">
            <InputSearchMovies />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default BrowseNavbar;
