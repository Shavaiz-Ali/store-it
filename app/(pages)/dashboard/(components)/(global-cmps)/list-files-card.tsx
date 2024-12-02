/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@/components/typography";
import Image from "next/image";
import React from "react";
import DashboardUploadActions from "./upload-actions";
import { cn, getFileType } from "@/lib/utils";

const ListFilesCard = ({ user }: any) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 xs:gap-4 sm:gap-6 w-full">
      {user?.map((user: any) => {
        const { type } = getFileType(user?.filename);
        return (
          <div
            className="space-y-5 rounded-[20px] bg-white sm:p-4 p-3"
            key={user?._id}
          >
            <div className="flex justify-between items-center w-full">
              <div className="relative size-20 rounded-full bg-primaryOrangeLight/10 flex justify-center items-center overflow-hidden">
                {type === "image" && (
                  <Image
                    src={user?.url}
                    alt="folder"
                    fill
                    className={cn("object-cover rounded-full", {
                      "w-[40px] h-[40px] object-contain":
                        user?.filename?.includes("svg"),
                    })}
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <DashboardUploadActions />
                <Typography variant="p" className="text-[1rem]">
                  1 KB
                </Typography>
              </div>
            </div>
            <div className="space-y-[15px]">
              <Typography variant="p" className="font-semibold leading-5">
                BC company.sketch
              </Typography>
              <Typography variant="p" className="">
                10:09pm, 10 Oct
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListFilesCard;
