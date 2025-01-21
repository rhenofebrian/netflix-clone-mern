import Navbar from "./Navbar";

export const DefaulLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
