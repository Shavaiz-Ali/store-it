/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import React from "react";
import Typography from "../../../../../components/typography";
import Image from "next/image";
import DashboardUploadActions from "../(global-cmps)/upload-actions";
// import { useAuthContext } from "@/context/authContext";
import {
  cn,
  formatDateTime,
  getColor,
  getFileMainIcon,
  getFileType,
  getFileUrl,
} from "@/lib/utils";
import Link from "next/link";
// import { loggedInUser } from "@/actions/auth/me";
// import { getFileType } from "@/lib/utils";

const DashboardRecentUploads = async ({
  recentUploads,
  user,
}: {
  recentUploads: any[] | undefined;
  user: any;
}) => {
  // const user = await loggedInUser();
  // const userUploads = user?.user;
  return (
    <div className="w-full h-full bg-white rounded-[20px] py-6 px-4 sm:px-7 space-y-[28px]">
      <Typography variant="h2" className="font-bold text-[18px] sm:text-[24px]">
        Recent files uploaded
      </Typography>
      {recentUploads && recentUploads && recentUploads?.length > 0 ? (
        recentUploads.map((recent: any) => {
          const { type, extension } = getFileType(recent?.filename);
          console.log(type);
          const color = getColor(extension, type);
          const url = getFileUrl(type);
          return (
            <div
              className="flex justify-between items-center w-full gap-x-2"
              key={Math.random()}
            >
              <Link
                href={url}
                className="flex justify-center items-center gap-x-2"
              >
                <div
                  className={cn(
                    "relative size-12 rounded-full overflow-hidden bg-blue-600 flex justify-center items-center"
                  )}
                  style={{ backgroundColor: `${color}` }}
                >
                  <Image
                    src={getFileMainIcon(extension, type)}
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
                    {recent.filename}
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-[12px] font-medium leading-[20px] text-[#A3B2C7]"
                  >
                    {formatDateTime(recent?.createdAt)}
                  </Typography>
                </div>
              </Link>{" "}
              <DashboardUploadActions
                extension={extension}
                fileType={`${type}s`}
                userId={user?._id}
                public_id={recent?.public_id}
                user={recent}
                fileId={recent?._id}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <Typography variant="h3">No recent uploads!</Typography>
        </div>
      )}
    </div>
  );
};

export default DashboardRecentUploads;
