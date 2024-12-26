/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFilesSize } from "@/actions/file-size";
import { convertFileSize, formatDateTime } from "@/lib/utils";

export const useGetFileSize = ({ user }: { user: any[] }) => {
  const [filesSize, setFilesSize] = React.useState<undefined | any>({
    size: 0,
    updatedAt: "",
  });

  const getSize = useCallback(
    ({ type }: { type: string | undefined }) => {
      const size = getFilesSize({ type })
        .then((size) => {
          if (size?.size) {
            const finalSize = convertFileSize(size?.size as number);
            setFilesSize({
              size: finalSize as any,
              updatedAt: formatDateTime(size?.updatedAt),
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return size;
    },
    [user]
  );

  return { filesSize, getSize };
};
