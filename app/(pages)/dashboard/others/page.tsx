/* eslint-disable @typescript-eslint/no-explicit-any */
import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";

const DashbaordOthers = async () => {
  const user = await loggedInUser();
  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }

  const documents = user && user?.user && user?.user?.documents;

  if (!documents || documents?.length < 1) {
    return (
      <Typography variant="h2">
        You haven`&lsquo;t uploaded any documents yet.
      </Typography>
    );
  }

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
  ];

  // Function to get the file extension
  const getFileExtension = (filename: string) => {
    return filename?.split(".").pop()?.toLowerCase() || "";
  };

  console.log(user);

  return (
    <div>
      <ListFilesCard
        user={documents?.filter((document: any) => {
          const fileExtension = getFileExtension(document.filename);
          return !documentExtensions.includes(fileExtension); // Show only matching extensions
        })}
      />
    </div>
  );
};

export default DashbaordOthers;
