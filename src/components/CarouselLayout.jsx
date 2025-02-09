import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CarouselLayout = ({ children }) => {
  const ref = useRef(null);
  const slide = (offset) => {
    ref.current.scrollLeft += offset;
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-between absolute left-0 w-full h-full">
        <button
          onClick={() => slide(-900)}
          className="z-10 hover:bg-blue-900/50 text-white text-center opacity-75 transition-all ease-in-out duration-300 h-72 w-10"
        >
          <GoChevronLeft size={32} />
          Left
        </button>
        <button
          onClick={() => slide(900)}
          className="z-10 hover:bg-blue-900/50 text-white text-center opacity-75 transition-all ease-in-out duration-300 h-48 w-10 mt-4"
        >
          <GoChevronRight size={32} /> Right
        </button>
      </div>
      <div ref={ref} className="carousel relative scroll-smooth space-x-2">
        {children}
      </div>
    </div>
  );
};

export default CarouselLayout;
