import React from "react";
import { AI, Decen, Hero } from "../assets";

const Home = () => {
  return (
    <div className="w-full pb-[3rem]">
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
      <section className="my-[4rem] layout ">
        <h2 className="text-center text-2xl  md:text-3xl lg:text-4xl my-5 font-bold">
          What make us stand out
        </h2>
        <div className="mt-12 flex items-start justify-between gap-y-10 md:gap-y-0 flex-col md:flex-row">
          <div className="w-full">
            <h3 className="bg-gradient-to-l from-[#1a2980] to-[#26d0ce]  bg-clip-text text-transparent text-center md:text-left text-lg md:text-2xl font-semibold">
              Decentralized Video Hosting for Educators on the Blockchain{" "}
            </h3>
            <p className="mt-3 text-sm md:text-lg">
              A blockchain-powered video hosting platform that enables educators
              to securely upload and share their content without relying on
              centralized servers.This ensures content ownership, transparency,
              and censorship resistance while providing learners with
              unrestricted access to high-quality educational materials.
            </p>
          </div>
          <div className="w-full flex items-center md:items-end justify-center md:justify-end ">
            <img
              src={Decen}
              alt=""
              className="w-[75%] h-[280px] md:h-[350px]"
            />
          </div>
        </div>

        <div className="my-[2rem] md:my-[4rem] flex items-start justify-between gap-y-10 md:gap-y-0 flex-col-reverse md:flex-row">
          <div className="w-full flex items-center md:items-start justify-center md:justify-normal">
            <img src={AI} alt="" className="w-[75%] h-[280px] md:h-[350px]" />
          </div>
          <div className="w-full">
            <h3 className="bg-gradient-to-l from-[#1a2980] to-[#26d0ce] bg-clip-text text-transparent text-lg text-center md:text-left md:text-2xl font-semibold">
              Automated Course Transcription & Native Language Translation
            </h3>
            <p className="mt-3 text-sm md:text-lg">
              An AI-driven platform that transcribes course content into text
              and translates it into learners' native languages in real time.
              This ensures accessibility, inclusivity, and a seamless learning
              experience for students worldwide, allowing them to engage with
              educational materials in the language they understand best.
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-12 flex items-start justify-between gap-y-10 md:gap-y-0 flex-col md:flex-row">
          <div className="w-full">
            <h3 className="bg-gradient-to-l from-[#1a2980] to-[#26d0ce] bg-clip-text text-transparent text-center md:text-left text-lg md:text-2xl font-semibold">
              Web3-Powered Course Completion Certificates
            </h3>
            <p className="mt-3 text-sm md:text-lg">
              A decentralized certification system leveraging blockchain
              technology to issue verifiable, tamper-proof course completion
              certificates. This ensures learners receive secure, transparent,
              and globally recognized credentials.
            </p>
          </div>
          <div className="w-full flex items-center md:items-end justify-center md:justify-end ">
            <img
              src={Decen}
              alt=""
              className="w-[75%] h-[280px] md:h-[350px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
