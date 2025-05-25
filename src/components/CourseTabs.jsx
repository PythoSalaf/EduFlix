import { useState } from "react";

const CourseTabs = () => {
  const tabs = ["Overview", "Q&A", "Notes", "Reviews", "Learning Tools"];
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <p className="text-sm md:text-base">This is the course overview.</p>
        );
      case "Q&A":
        return (
          <p className="text-sm md:text-base">
            Here you can ask or read questions.
          </p>
        );
      case "Notes":
        return (
          <p className="text-sm md:text-base">
            These are your personal course notes.
          </p>
        );
      case "Reviews":
        return (
          <p className="text-sm md:text-base">
            See what other students think of this course.
          </p>
        );
      case "Learning Tools":
        return (
          <p className="text-sm md:text-base">
            Tools to help you learn better.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable tab bar */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto border-b border-gray-300 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 whitespace-nowrap text-sm sm:text-base font-medium transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 sm:mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default CourseTabs;
