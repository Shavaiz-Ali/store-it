/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { formatDateTime, getFileIcon, getFileType } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const getFileurl = (type: string) => {
  switch (type) {
    case "image":
      return "/dashboard/images";
    case "video":
      return "/dashboard/media";
    case "document":
      return "/dashboard/others";
    default:
      return "/dashboard/others";
  }
};

const SearchResults = ({
  searchResults,
  setSearchResults,
  query,
}: {
  searchResults: any[] | null;
  setSearchResults: (value: null) => void;
  query: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="absolute top-16 left-0 w-full  shadow-lg shadow-[#5968B20F] border py-3 px-4 rounded-[16px] z-[99999999999] bg-white space-y-2 max-h-[400px] overflow-y-scroll "
      key={Math.random()}
    >
      {searchResults && searchResults?.length > 0 ? (
        searchResults?.map((search) => {
          const { type, extension } = getFileType(search?._doc?.filename);
          const url = getFileurl(type);
          return (
            <div
              className="flex justify-between items-center w-full gap-x-3"
              key={search?._id}
            >
              <div className="flex justify-start items-center gap-x-3 w-full">
                <div className="size-12 flex justify-center items-center rounded-full bg-[#fa72751a] shrink-0">
                  <Image
                    src={getFileIcon(extension, type)}
                    alt=""
                    height={25}
                    width={25}
                  />
                </div>
                <Button
                  type="button"
                  className="border-none outline-none bg-transparent hover:bg-transparent p-0"
                  onClick={() => {
                    setSearchResults(null);
                    router.push(`${url}?query=${query}`);
                  }}
                >
                  <Typography
                    variant="p"
                    className="font-semibold w-full line-clamp-1"
                  >
                    {search?._doc?.filename}
                  </Typography>
                </Button>
              </div>
              <div className="w-full text-end">
                <Typography
                  variant="p"
                  className="text-[12px] text-[#a3b2c7] line-clamp-1 w-full"
                >
                  {formatDateTime(search?._doc?.createdAt)}
                </Typography>
              </div>
            </div>
          );
        })
      ) : (
        <Typography
          variant="p"
          className="text-[12px] text-[#a3b2c7] text-center"
        >
          No matching files found
        </Typography>
      )}
    </div>
  );
};

export default SearchResults;
