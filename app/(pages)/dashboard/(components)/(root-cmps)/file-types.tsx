/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertFileSize, formatDateTime, getUsageSummary } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Typography from "../../../../../components/typography";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { getFilesSize } from "@/actions/file-size";

const DashboardFileTypes = ({ fileTypesData }: { fileTypesData: any }) => {
  return (
    <>
      {fileTypesData.map((data: any, index: any) => (
        <Link href={data.url} key={index}>
          <div className="relative flex flex-col justify-center items-center gap-y-2 bg-white w-full h-auto py-[40px] rounded-[20px] hover:scale-105 transition-all duration-200">
            <div className="absolute top-3 right-3">
              <Typography
                variant="h4"
                className="font-[500] text-[18px] leading-6 "
              >
                {data.size}
              </Typography>
            </div>
            <div
              className={
                "absolute -left-5 -top-5 size-[80px] bg-[#f2f4f8] rounded-full flex justify-center items-center p-4"
              }
            >
              <div
                className={`size-12 rounded-full flex justify-center items-center z-20`}
                style={{ backgroundColor: data.color }}
              >
                <Image
                  src={data.icon}
                  alt={data.title}
                  height={25}
                  width={25}
                />
              </div>
            </div>
            <Typography
              variant="h5"
              className="font-[600] text-[16px] leading-[24px]"
            >
              {data.title}
            </Typography>
            <Separator className="w-44" />
            <Typography
              variant="p"
              className="font-[400] text-[16px] leading-[24px] text-[#A3B2C7]"
            >
              Last Update
            </Typography>
            <Typography
              variant="p"
              className="font-[400] text-[16px] leading-[24px]"
            >
              {data.updatedAt}
            </Typography>
          </div>
        </Link>
      ))}
    </>
  );
};

export default DashboardFileTypes;
