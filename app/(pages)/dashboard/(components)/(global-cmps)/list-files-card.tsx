/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@/components/typography";
import Image from "next/image";
import React from "react";
import DashboardUploadActions from "./upload-actions";
import {
  cn,
  convertFileSize,
  // extractCloudinaryPublicId,
  formatDateTime,
  getFileIcon,
  getFileType,
} from "@/lib/utils";

const ListFilesCard = ({
  user,
  filetype,
  userId,
}: {
  user: any;
  filetype: string;
  userId: string;
}) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 xs:gap-4 sm:gap-6 w-full">
      {user?.map((user: any) => {
        const { type, extension } = getFileType(user?.filename);
        // const public_id = extractCloudinaryPublicId(user?.url);
        // console.log(public_id);
        console.log(extension);
        return (
          <div
            className="space-y-5 rounded-[20px] bg-white sm:p-4 p-3"
            key={user?._id}
          >
            <div className="flex justify-between items-center w-full">
              <div className="relative size-20 rounded-full bg-primaryOrangeLight/10 flex justify-center items-center overflow-hidden">
                {type === "image" && !user?.filename?.includes("svg") ? (
                  <Image
                    src={user?.url}
                    alt="folder"
                    fill
                    className={cn("object-cover rounded-full", {
                      "w-[40px] h-[40px] object-none rounded-none":
                        user?.filename?.includes("svg"),
                      "w-[10px] h-[10px]": user?.filename?.includes("dots.svg"),
                    })}
                    priority={false}
                  />
                ) : (
                  <Image
                    src={getFileIcon(extension, type)}
                    alt="folder"
                    height={40}
                    width={40}
                    priority={false}
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <DashboardUploadActions
                  fileType={filetype}
                  fileId={user?._id}
                  userId={userId}
                  public_id={user?.public_id}
                  user={user}
                  extension={extension}
                />
                <Typography variant="p" className="text-[1rem]">
                  {convertFileSize(user?.size)}
                </Typography>
              </div>
            </div>
            <div className="space-y-[15px]">
              <Typography
                variant="p"
                className="font-semibold leading-5 line-clamp-2"
              >
                {user?.filename}
              </Typography>
              <Typography variant="p" className="">
                {formatDateTime(user?.updatedAt)}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListFilesCard;
