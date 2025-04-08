import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60vh] md:h-screen flex items-center justify-center py-6 flex-col">
      <h3 className="text-2xl font-semibold text-[#1a2980] uppercase md:text-3xl lg:text-4xl ">
        Edu-<span className="text-[#26d0ce] italic">Flix</span>
      </h3>
      <div className="my-16">
        <h2 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold">
          Opps!
        </h2>
        <h2 className="mt-14 text-2xl ">Page Not Found</h2>
      </div>
      <button
        className="linear px-6 py-2 rounded-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        Go back Home
      </button>
    </div>
  );
};

export default ErrorPage;
