/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Typography from "@/components/typography";
import DashboardSort from "./sort";
import { useGetFileSize } from "@/hooks/use-getFileSize";
import { useEffect } from "react";

const DashboardPagesHeader = ({
  title,
  user,
  type,
}: {
  title: string;
  user: any;
  type: string;
}) => {
  const { filesSize, getSize } = useGetFileSize({ user });

  useEffect(() => {
    getSize({ type });
  }, [user]);

  return (
    <div className="space-y-2 w-full">
      <Typography variant="h2">{title}</Typography>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center w-full sm:gap-0 gap-y-5">
        <Typography variant="h5">
          Total:{" "}
          <span className="font-semibold">
            {filesSize?.size ? filesSize?.size : "0MB"}
          </span>
        </Typography>
        <div className="flex justify-center items-center gap-x-2 sm:w-auto w-full">
          <Typography className="sm:block hidden" variant="p">
            Sort By :
          </Typography>
          <DashboardSort />
        </div>
      </div>
    </div>
  );
};

export default DashboardPagesHeader;
