import { motion } from "framer-motion";
import { useState } from "react";
import { GoSearch } from "react-icons/go";

const InputSearchMovies = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="relative">
      <motion.input
        initial={{ translateX: -20 }}
        animate={{ translateX: isShow ? 0 : -20 }}
        className="bg-transparent border py-2 pl-12"
        style={{ display: isShow ? "block" : "none" }}
        placeholder="title,people,genres..."
      />
      <GoSearch
        className={isShow ? "absolute top-1/2 -translate-y-1/2 left-3 " : null}
        size={24}
        onClick={() => setIsShow(!isShow)}
      />
    </div>
  );
};

export default InputSearchMovies;
