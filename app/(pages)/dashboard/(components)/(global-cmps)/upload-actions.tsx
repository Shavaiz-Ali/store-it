"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Typography from "@/components/typography";
import DashboardUploadActionsDialog from "./upload-action-dialog";
import { deleteFile } from "@/actions/dashboard/delete-file";
import { usePathname } from "next/navigation";

const DashboardUploadActions = ({
  fileType,
  fileId,
  userId,
}: {
  fileType: string;
  fileId: string;
  userId: string;
}) => {
  const [options, setOptions] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const pathname = usePathname();
  const optionsData = [
    {
      name: "Rename",
      icon: "/icons/edit.svg",
    },
    {
      name: "Details",
      icon: "/icons/info.svg",
    },
    {
      name: "Share",
      icon: "/icons/share.svg",
    },
    {
      name: "Download",
      icon: "/icons/download.svg",
    },
    {
      name: "Delete",
      icon: "/icons/delete.svg",
    },
  ];

  const handleActions = (actionType: string) => {
    if (actionType === "Delete") {
      deleteFile({ fileType, fileId, userId, pathname })
        .then((data) => {
          if (data?.status === 200) {
            alert("file deleted successfully!");
          }
        })
        .catch((err) => {
          setOpenDialog(false);
          console.log(err);
        })
        .finally(() => {
          setOpenDialog(false);
        });
    }
  };
  return (
    <div>
      <Image
        src={"/icons/dots.svg"}
        alt="image"
        width={8}
        height={8}
        className="cursor-pointer"
        onClick={() => setOptions(!options)}
      />
      <DropdownMenu open={options} onOpenChange={setOptions}>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Title</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <div className="flex"></div> */}
          {optionsData.map((option, index) => (
            <DropdownMenuItem
              key={index}
              className="flex justify-start items-center gap-x-2 cursor-pointer"
              onClick={() => {
                if (option.name === "Download") {
                  setOptions(false);
                } else {
                  setAction(option.name);
                  setOpenDialog(true);
                  setOptions(false);
                }
              }}
            >
              <Image
                src={option.icon}
                alt={option.name}
                width={30}
                height={30}
              />
              <Typography variant="p" className="">
                {option.name}
              </Typography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {openDialog && (
        <DashboardUploadActionsDialog
          action={action}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleActions={handleActions}
        />
      )}
    </div>
  );
};

export default DashboardUploadActions;
