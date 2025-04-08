import React from "react";
import { VideoCard } from "../components";
import { blockchainVideos } from "../components/DummyData";

const Course = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 pb-2">
      {blockchainVideos.map((item) => (
        <VideoCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Course;
