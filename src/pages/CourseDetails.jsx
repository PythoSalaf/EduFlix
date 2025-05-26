import { useState } from "react";
import { Readdy } from "../assets";
import { IoIosArrowDown } from "react-icons/io";
import { CourseTabs } from "../components";

const CourseDetails = () => {
  const [transcribe, setTranscribe] = useState("transcribe");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };
  return (
    <div>
      <div className="flex items-start gap-8 flex-col md:flex-row justify-between">
        <div className="w-full md:w-[65%] md:h-[300px] lg:h-[370px] bg-[#dadada] shadow rounded-2xl">
          <div className="w-[90%] mx-auto md:w-full  h-full  py-1">
            <video src={Readdy} controls className="w-full h-full" />
          </div>
        </div>
        <div className="w-full md:w-[35%] h-[59vh] bg-white shadow-2xl rounded-3xl py-4 overflow-y-auto">
          <div className="w-[90%] mx-auto">
            <div className="flex items-center gap-x-7">
              <button
                className={`text-sm md:text-base font-semibold rounded-3xl px-3 py-1 ${
                  transcribe === "transcribe"
                    ? "bg-[#26D0CE] text-white"
                    : "bg-black text-white"
                }`}
                onClick={() => setTranscribe("transcribe")}
              >
                Transcribe
              </button>
              <button
                className={`text-sm md:text-base font-semibold rounded-3xl px-3 py-1 ${
                  transcribe === "summarize"
                    ? "bg-[#26D0CE] text-white "
                    : "bg-black text-white"
                }`}
                onClick={() => setTranscribe("summarize")}
              >
                Summarize
              </button>
            </div>
            <div className="mt-4">
              {transcribe === "transcribe" && (
                <div className="relative">
                  <div className="flex items-center font-semibold justify-between w-full">
                    <h2 className="">{selectedLanguage}</h2>
                    <div
                      className="rounded-md border-2 border-[#dadada] px-1 py-1 cursor-pointer w-fit"
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      <IoIosArrowDown
                        className={`transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                    {isOpen && (
                      <div className="absolute right-0 top-8 text-white rounded-md bg-[#26D0CE] w-[150px] py-3">
                        <div className="flex-col flex items-center justify-center space-y-2">
                          {["English", "Spanish", "French"].map((lang) => (
                            <h3
                              key={lang}
                              onClick={() => handleSelect(lang)}
                              className="cursor-pointer hover:underline"
                            >
                              {lang}
                            </h3>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h4 className="">
                      Welcome to the session. Today, we'll be discussing how
                      artificial intelligence is transforming the future of
                      work. From automating routine tasks to enabling smarter
                      decision-making, AI is changing how businesses operate.
                      But with these advancements also come challenges — such as
                      ethical concerns, job displacement, and the need for new
                      skills. We'll break down each of these topics, explore
                      real-world examples, and discuss what the future might
                      hold. So grab a notepad, and let's dive into this exciting
                      transformation.
                    </h4>
                  </div>
                </div>
              )}

              {transcribe === "summarize" && (
                <div className="w-full flex items-center justify-center">
                  <h3 className="text-3xl text-center">Coming Soon </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mt-6 pb-4">
          <CourseTabs />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
