/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { renameFile } from "@/actions/dashboard/rename-file";
// import { useToast } from "@/hooks/use-toast";
import { useAlertMessages } from "@/hooks/use-alerts";

const DashboardUploadActions = ({
  fileType,
  fileId,
  userId,
  public_id,
  user,
  extension,
}: {
  fileType: string;
  fileId: string;
  userId: string;
  public_id: string;
  user: any;
  extension: string;
}) => {
  const [options, setOptions] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [newName, setNewName] = useState<string | undefined>(user?.filename);
  // const { toast } = useToast();
  const { handleApiResponseMessages } = useAlertMessages();

  console.log(extension);

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

  const handleActions = ({ actionType }: { actionType: string }) => {
    try {
      setLoader(true);
      if (actionType === "Delete") {
        deleteFile({ fileType, fileId, userId, pathname, public_id })
          .then((data) => {
            handleApiResponseMessages(
              data?.message as string,
              data?.status as number
            );
            if (data?.status === 200) {
              setLoader(false);
            }
          })
          .catch((err) => {
            handleApiResponseMessages(
              err?.message as string,
              err?.status as number
            );
            setOpenDialog(false);
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
            setOpenDialog(false);
          });
      } else if (actionType === "Rename") {
        // const { extension } = getFileType(user?.filename);
        // console.log(extension);
        renameFile({ fileType, fileId, userId, pathname, newName, extension })
          .then((data) => {
            handleApiResponseMessages(
              data?.message as string,
              data?.status as number
            );
            if (data?.status === 200) {
              setLoader(false);
            }
          })
          .catch((err) => {
            handleApiResponseMessages(
              err?.message as string,
              err?.status as number
            );
            setOpenDialog(false);
            console.log(err);
          })
          .finally(() => {
            setLoader(false);
            setOpenDialog(false);
          });
      }
    } catch (error) {
      setLoader(false);
      throw new Error(error as any);
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
          loader={loader}
          setNewName={setNewName}
          newName={newName}
        />
      )}
    </div>
  );
};

export default DashboardUploadActions;
