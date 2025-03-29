import React from "react";
import { Hero } from "../assets";

const Home = () => {
  return (
    <div className="w-full">
      <div className="linear py-4 md:h-screen md:py-8">
        <div className="layout flex items-start justify-between gap-y-9 md:gap-y-0 flex-col md:flex-row">
          <div className="w-full">
            <h2 className="text-xl md:text-3xl leading-11 font-semibold md:leading-16 lg:text-4xl">
              {" "}
              Learn Anything, Anytime, in <br /> Your Native Language!
            </h2>
            <p className="py-4 md:py-8 text-base md:text-lg lg:text-xl">
              Empowering students globally with AI-driven real-time translation.
              Learn courses in your language, no barriers, just knowledge.
            </p>
            <div className="flex items-center mt-3 md:mt-0 md:justify-normal gap-x-6 ">
              <button className="bg-white rounded-3xl px-4 py-1.5 md:py-2 text-base md:text-lg lg:text-xl">
                Learn Now
              </button>
              <button className="bg-white rounded-3xl px-4 py-1.5 md:py-2 text-base md:text-lg lg:text-xl">
                Explore Courses
              </button>
            </div>
          </div>
          <div className="w-full  flex items-center justify-center mt-4 md:mt-0 md:justify-end">
            <img src={Hero} alt="" className="w-[75%] md:w-[62%]" />
          </div>
        </div>
      </div>
      <section className="my-[2rem]">
        <h2 className="text-center text-xl  md:text-2xl font-bold">
          What make us stand out
        </h2>
      </section>
    </div>
  );
};

export default Home;
