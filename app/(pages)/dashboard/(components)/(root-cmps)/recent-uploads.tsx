import React from "react";
import Typography from "../../../../../components/typography";
import Image from "next/image";
import DashboardUploadActions from "../(global-cmps)/upload-actions";

const DashboardRecentUploads = () => {
  return (
    <div className="w-full h-full bg-white rounded-[20px] py-6 px-4 sm:px-7 space-y-[28px]">
      <Typography variant="h2" className="font-bold text-[18px] sm:text-[24px]">
        Recent files uploaded
      </Typography>
      {Array.from({ length: 5 }).map(() => (
        <div
          className="flex justify-between items-center w-full gap-x-2"
          key={Math.random()}
        >
          <div className="flex justify-center items-center gap-x-2">
            <div className="relative size-12 rounded-full overflow-hidden bg-blue-600 flex justify-center items-center">
              <Image
                src={"/icons/Video.svg"}
                alt="image"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col justify-between">
              <Typography
                variant="p"
                className="text-[14px] font-semibold leading-[20px] line-clamp-1"
              >
                DevOverflow Intro.mp4
              </Typography>
              <Typography
                variant="p"
                className="text-[12px] font-medium leading-[20px] text-[#A3B2C7]"
              >
                01:56pm, 04 Nov
              </Typography>
            </div>
          </div>{" "}
          <DashboardUploadActions />
        </div>
      ))}
    </div>
  );
};

export default DashboardRecentUploads;
