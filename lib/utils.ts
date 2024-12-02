/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

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
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

type FileType = string;

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/icons/file-pdf.svg";
    case "doc":
      return "/icons/file-doc.svg";
    case "docx":
      return "/icons/file-docx.svg";
    case "csv":
      return "/icons/file-csv.svg";
    case "txt":
      return "/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/icons/file-document.svg";
    // Image
    case "svg":
      return "/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/icons/file-image.svg";
        case "document":
          return "/icons/file-document.svg";
        case "video":
          return "/icons/file-video.svg";
        case "audio":
          return "/icons/file-audio.svg";
        default:
          return "/icons/file-other.svg";
      }
  }
};

// DASHBOARD UTILS
export const getUsageSummary = (totalSpace?: any) => {
  return [
    {
      title: "Documents",
      size: 0,
      // latestDate: totalSpace.document.latestDate,
      icon: "/icons/Folder.svg",
      url: "/dashboard/documents",
      color: "#FF7474",
      type: "documents",
    },
    {
      title: "Images",
      size: 0,
      // latestDate: totalSpace.image.latestDate,
      icon: "/icons/Image.svg",
      url: "/dashboard/images",
      color: "#56B8FF",
      type: "images",
    },
    {
      title: "Media",
      size: 0,
      // latestDate:
      //   totalSpace.video.latestDate > totalSpace.audio.latestDate
      //     ? totalSpace.video.latestDate
      //     : totalSpace.audio.latestDate,
      icon: "/icons/Video.svg",
      url: "/dashboard/media",
      color: "#3DD9B3",
      type: "videos",
    },
    {
      title: "Others",
      size: 0,
      // latestDate: totalSpace.other.latestDate,
      icon: "/icons/Other.svg",
      url: "/dashboard/others",
      color: "#EEA8FD",
      type: "documents",
    },
  ];
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};

export const getColor = (
  extension: string | undefined,
  type: FileType | string
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "#EEA8FD";
    case "doc":
      return "##EEA8FD";
    case "docx":
      return "##EEA8FD";
    // Image
    case "svg":
      return "/icons/file-image.svg";

    default:
      switch (type) {
        case "image":
          return "#56B8FF";
        case "document":
          return "#FF7474";
        case "video":
          return "#3DD9B3";
        case "audio":
          return "#3DD9B3";
        default:
          return "#FF7474";
      }
  }
};

export const getFileMainIcon = (
  extension: string | undefined,
  type: FileType | string
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/icons/Folder.svg";
    case "doc":
      return "/icons/Folder.svg";
    case "docx":
      return "/icons/Folder.svg";
    case "csv":
      return "/icons/Other.svg";
    case "txt":
      return "/icons/Other.svg";
    case "xls":
    case "xlsx":
      return "/icons/Other.svg";
    // Image
    case "svg":
      return "/icons/Image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/icons/Video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/icons/Video.svg";

    default:
      switch (type) {
        case "image":
          return "/icons/Video.svg";
        case "document":
          return "/icons/Folder.svg";
        case "video":
          return "/icons/Video.svg";
        case "audio":
          return "/icons/Video.svg";
        default:
          return "/icons/Image.svg";
      }
  }
};

export const getFileUrl = (type: FileType) => {
  switch (type) {
    case "image":
      return "/dashboard/images";
    case "document":
      return "/dashboard/documents";
    case "video":
      return "/dashboard/media";
    case "audio":
      return "/dashbaord/media";
    default:
      return "/dashboard/others";
  }
};
