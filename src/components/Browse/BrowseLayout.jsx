import BrowseNavbar from "./BrowseNavbar";

BrowseNavbar;

const BrowseLayout = ({ children }) => {
  return (
    <div className="bg-[#141414]">
      <BrowseNavbar />
      <div>{children}</div>
    </div>
  );
};

export default BrowseLayout;
