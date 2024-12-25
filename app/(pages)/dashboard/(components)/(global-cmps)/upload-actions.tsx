/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback } from "react";
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
import { useAlertMessages } from "@/hooks/use-alerts";

interface Option {
  name: string;
  icon: string;
}

interface User {
  filename?: string;
  // Add more fields as necessary
}
interface DashboardUploadActionsProps {
  fileType: string;
  fileId: string;
  userId: string;
  public_id: string;
  user: User;
  extension: string;
  file: any;
}

const DashboardUploadActions: React.FC<DashboardUploadActionsProps> = ({
  fileType,
  fileId,
  userId,
  public_id,
  user,
  extension,
  file,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newName, setNewName] = useState<string | undefined>(user?.filename);
  const { handleApiResponseMessages } = useAlertMessages();
  const pathname = usePathname();

  const optionsData: Option[] = [
    { name: "Rename", icon: "/icons/edit.svg" },
    { name: "Details", icon: "/icons/info.svg" },
    { name: "Share", icon: "/icons/share.svg" },
    { name: "Download", icon: "/icons/download.svg" },
    { name: "Delete", icon: "/icons/delete.svg" },
  ];

  const handleActions = useCallback(
    async ({ actionType }: { actionType: string }) => {
      setIsLoading(true);
      try {
        let response;
        switch (actionType) {
          case "Delete":
            response = await deleteFile({
              fileType,
              fileId,
              userId,
              pathname,
              public_id,
            });
            break;
          case "Rename":
            response = await renameFile({
              fileType,
              fileId,
              userId,
              pathname,
              newName,
              extension,
            });
            break;
          case "Download":
            alert("Download file logic here");
            break;
          default:
            setIsLoading(false);
            return;
        }
        if (response) {
          handleApiResponseMessages(
            response?.message as string,
            response?.status as number
          );
        }
      } catch (error: any) {
        handleApiResponseMessages(error?.message, error?.status);
      } finally {
        setIsLoading(false);
        setIsDialogOpen(false);
      }
    },
    [
      fileType,
      fileId,
      userId,
      pathname,
      public_id,
      newName,
      extension,
      handleApiResponseMessages,
    ]
  );

  return (
    <div className="shrink-0">
      <DropdownMenu open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
        <DropdownMenuTrigger>
          <Image
            src={"/icons/dots.svg"}
            alt="image"
            width={8}
            height={8}
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Title</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {optionsData.map((option, index) => (
            <DropdownMenuItem
              key={index}
              className="flex justify-start items-center gap-x-2 cursor-pointer"
              onClick={() => {
                if (option.name === "Download") {
                  window.open(file.url, "_blank");
                  // handleActions({ actionType: "Download" });
                  setIsOptionsOpen(false);
                } else {
                  setActionType(option.name);
                  setIsDialogOpen(true);
                  setIsOptionsOpen(false);
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

      {isDialogOpen && (
        <DashboardUploadActionsDialog
          action={actionType}
          openDialog={isDialogOpen}
          setOpenDialog={setIsDialogOpen}
          handleActions={handleActions}
          loader={isLoading}
          setNewName={setNewName}
          newName={newName}
          file={file}
        />
      )}
    </div>
  );
};

export default DashboardUploadActions;
