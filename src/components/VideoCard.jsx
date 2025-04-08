import { useNavigate } from "react-router-dom";

const VideoCard = ({ title, thumbnail, description, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[85%] mx-auto md:w-full bg-white cursor-pointer  pb-2"
      onClick={() => navigate(`/courses/${id}`)}
    >
      <img
        src={thumbnail}
        alt=""
        className="w-full rounded-xl h-[150px] md:h-[180px]"
      />
      <div className="flex items-center gap-x-1.5 my-3 w-[96%] m-auto">
        <div className="bg-[#D9D9D9] rounded-full w-8 h-8"></div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="w-[93%] m-auto">
        <h4 className="">Text</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
