import { useNavigate, useParams } from "react-router-dom";
import BrowseLayout from "../components/Browse/BrowseLayout";
import ReactPlayer from "react-player";
import { GoChevronLeft } from "react-icons/go";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <BrowseLayout>
      <div
        className="absolute top-20 left-6 hover:bg-white hover:text-[#353535] transition-all cursor-pointer bg-[#353535] text-white rounded-md"
        onClick={() => navigate("/browse")}
      >
        <GoChevronLeft size={44} />
      </div>
      <ReactPlayer
        url={"https://youtube.com/watch?v=" + id}
        width={"100%"}
        height={"100vh"}
        playing={true}
        muted={false}
        controls={false}
      />
    </BrowseLayout>
  );
};

export default Watch;
