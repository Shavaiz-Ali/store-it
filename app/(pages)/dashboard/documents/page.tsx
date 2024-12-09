/* eslint-disable @typescript-eslint/no-explicit-any */
import { loggedInUser } from "@/actions/auth/me";
import Typography from "@/components/typography";
import React from "react";
import ListFilesCard from "../(components)/(global-cmps)/list-files-card";
import DashboardPagesHeader from "../(components)/(global-cmps)/pages-header";

const DashboardDocuments = async () => {
  const user = await loggedInUser();
  if (user?.status !== 200) {
    return <Typography variant="h2">Empty1</Typography>;
  }

  const documents = user && user?.user && user?.user?.documents;

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

  return (
    <div className="space-y-6">
      <DashboardPagesHeader title="Documents" />
      {!documents || documents?.length < 1 ? (
        <Typography variant="h2">
          You haven`&lsquo;t uploaded any documents yet.
        </Typography>
      ) : (
        <ListFilesCard
          user={documents?.filter((document: any) => {
            const fileExtension = getFileExtension(document.filename);
            return documentExtensions.includes(fileExtension);
          })}
          userId={user?.user?._id}
          filetype="documents"
        />
      )}
    </div>
  );
};
export default DashboardDocuments;
