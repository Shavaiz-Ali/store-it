/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/typography";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { X } from "lucide-react";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { getFilesSize } from "@/actions/file-size";

const DashboardUploadActionsDialog = ({
  action,
  openDialog,
  setOpenDialog,
  handleActions,
  loader,
  setNewName,
  newName,
  file,
}: // detailsData,
{
  action: string;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  handleActions: ({ actionType }: { actionType: string }) => void;
  loader: boolean;
  setNewName: (newName: string) => void;
  newName: string | undefined;
  file: any;
  // detailsData: any[];
}) => {
  console.log(file);
  const detailsData = [
    { name: "Format", value: file?.format, id: Math.random() },
    { name: "Size", value: convertFileSize(file?.size), id: Math.random() },
    { name: "Owner", value: file?.filename, id: Math.random() },
    {
      name: "Last edit",
      value: formatDateTime(file?.createdAt),
      id: Math.random(),
    },
  ];
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {/* <Button variant="outline"></Button> */}
      </DialogTrigger>
      <DialogContent className="xs:max-w-[365px] w-[90%] !rounded-[26px]">
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setOpenDialog(false)}
        >
          <X size={20} className="" />
        </div>
        <DialogTitle className="text-center text-backgroundGrayLight font-[family-name:var(--font-poppins-medium)] text-[20px] leading-7  font-semibold`">
          {/* <Typography variant="h3" className=""> */}
          {action}
          {/* </Typography> */}
        </DialogTitle>
        <DialogHeader>
          {action === "Delete" && (
            <DialogDescription className="text-backgroundGrayLight text-center font-[family-name:var(--font-poppins-regular)]  text-[14px] leading-[16px] font-[400]">
              Are you sure you want to delete this{" "}
              <span className="text-primaryOrangeLight">
                DevOverflow Intro.mp4
              </span>
              ?
            </DialogDescription>
          )}
          {action === "Rename" && (
            <Input
              className="peer w-full border !py-3 !px-2 shadow-none placeholder:text-light-200 outline-none focus-visible:border-black ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 text-backgroundGrayDark font-[family-name:var(--font-poppins-semibold)] text-sm leading-5 focus:text-backgroundGrayLight focus:font-[600] focus:placeholder:font-[400] focus:placeholder:text-backgroundGrayDark"
              value={newName}
              type="text"
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
          {action === "Share" && (
            <div className="w-full h-[60px] border border-[#A3B2C7] flex items-center gap-x-3 px-2 rounded-[12px]">
              <div className="size-10 rounded-full bg-blue-600 flex justify-center items-center">
                <Image
                  src={"/icons/Video.svg"}
                  alt="share"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col justify-between">
                <Typography variant="h5" className="font-[600]">
                  DevOverflow Intro.mp4
                </Typography>
                <Typography variant="p" className="text-[12px] text-[#A3B2C7]">
                  10 GB - 10:09pm, 10 Oct
                </Typography>
              </div>
            </div>
          )}
        </DialogHeader>
        {action === "Share" && (
          <div className="space-y-3">
            <Typography variant="h5" className="font-[600]">
              Share file with other users:
            </Typography>
            <Input
              className="peer w-full border border-[#A3B2C7] !py-4 !px-5 h-[52px] shadow-lg sgadow-[#5968B20F] rounded-[30px] placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 text-backgroundGrayDark font-[family-name:var(--font-poppins-semibold)] text-sm leading-5 focus:text-backgroundGrayLight focus:font-[600] focus:placeholder:font-[400] focus:placeholder:text-backgroundGrayDark"
              // value={"DevOverflow Intro.mp4"}
              type="text"
              placeholder="Enter your email"
              onChange={() => {}}
            />
            <div className="flex justify-between items-center w-full">
              <Typography variant="h5" className="font-[600]">
                Share with users
              </Typography>
              <Typography variant="h5" className="font-[600] text-[#A3B2C7]">
                0 Users
              </Typography>
            </div>
          </div>
        )}
        {action === "Details" && (
          <div className="space-y-4">
            <div className="w-full h-[60px] border border-[#A3B2C7] flex items-center gap-x-3 px-2 rounded-[12px]">
              <div className="size-10 rounded-full bg-blue-600 flex justify-center items-center">
                <Image
                  src={"/icons/Video.svg"}
                  alt="share"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col justify-between">
                <Typography variant="h5" className="font-[600]">
                  DevOverflow Intro.mp4
                </Typography>
                <Typography variant="p" className="text-[12px] text-[#A3B2C7]">
                  10 GB - 10:09pm, 10 Oct
                </Typography>
              </div>
            </div>
            <div className="space-y-2">
              {detailsData?.map((detail) => (
                <div
                  key={detail.id}
                  className="flex items-center justify-start gap-x-6"
                >
                  <Typography
                    variant="h5"
                    className="w-[80px] text-backgroundGrayLight/50 "
                  >
                    {detail.name}
                    <span className="font-bold"> :</span>
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-semibold line-clamp-1 text-start"
                  >
                    {detail.value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          {["Delete", "Rename", "Share"].includes(action) && (
            <div className="flex justify-center items-center gap-x-3 w-full">
              <Button
                type="button"
                className="w-full py-6 px-4 bg-white rounded-[30px] drop-shadow-md hover:bg-white"
                onClick={() => setOpenDialog(false)}
              >
                <Typography variant="p" className="font-semibold text-[15px]">
                  Cancel
                </Typography>
              </Button>
              <Button
                type="button"
                className="w-full py-6 px-4 bg-primaryOrangeLight hover:bg-primaryOrangeLight rounded-[30px] drop-shadow-md"
                onClick={() => handleActions({ actionType: action })}
                disabled={loader}
              >
                <div className="flex justify-center items-center gap-x-2">
                  {loader && (
                    <div className="flex justify-center items-center gap-x-2">
                      <div className="h-4 w-4 rounded-full border border-white border-t-backgroundGrayLight animate-spin" />
                    </div>
                  )}
                  <Typography
                    variant="p"
                    className="font-semibold text-[15px] text-white flex justify-center items-center gap-x-2"
                  >
                    Confirm
                  </Typography>
                </div>
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardUploadActionsDialog;
