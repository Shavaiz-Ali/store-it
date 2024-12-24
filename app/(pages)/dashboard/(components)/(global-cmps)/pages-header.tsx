/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Typography from "@/components/typography";
import React, { useCallback, useEffect } from "react";
import DashboardSort from "./sort";
import { getFilesSize } from "@/actions/file-size";
import { convertFileSize } from "@/lib/utils";

const DashboardPagesHeader = ({
  title,
  user,
  type,
}: {
  title: string;
  user: any;
  type: string;
}) => {
  const [filesSize, setFilesSize] = React.useState<undefined | null>(null);

  const getSize = useCallback(() => {
    const size = getFilesSize({ type })
      .then((size) => {
        if (size?.size) {
          const finalSize = convertFileSize(size?.size as number);
          setFilesSize(finalSize as any);
        } else {
          const finalSize = convertFileSize(0);
          setFilesSize(finalSize as any);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return size;
  }, [user]);

  useEffect(() => {
    console.log("triggressd");
    getSize();
  }, [user]);

  console.log("this is file size", filesSize);
  return (
    <div className="space-y-2 w-full">
      <Typography variant="h2">{title}</Typography>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center w-full sm:gap-0 gap-y-5">
        <Typography variant="h5">
          Total:{" "}
          <span className="font-semibold">{filesSize ? filesSize : "0MB"}</span>
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
