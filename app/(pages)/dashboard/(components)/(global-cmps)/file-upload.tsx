/* eslint-disable @typescript-eslint/no-unused-vars */
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { uploadImageToCloudinary } from "@/actions/cloudinary/upload-image";
import { uploadVideoToCloudinary } from "@/actions/cloudinary/upload-video";
import { uploadRawToCloudinary } from "@/actions/cloudinary/upload-raw";
import Typography from "@/components/typography";
import { X } from "lucide-react";
import { getFileIcon, getFileType } from "@/lib/utils";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

interface DashboardFileUploadProps {
  userId: string;
}

const DashboardFileUpload: React.FC<DashboardFileUploadProps> = ({
  userId,
}) => {
  const { toast } = useToast();
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(
    async (acceptedFiles: File[]) => {
      if (!userId) {
        toast({
          description: "User ID is missing, cannot upload files.",
          className: "error-toast",
        });
        return; // Early return if userId is missing
      }

      setFiles(acceptedFiles);
      setIsUploading(true);
      try {
        await Promise.all(
          acceptedFiles.map(async (file) => {
            if (file.size > MAX_FILE_SIZE) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
              toast({
                description: (
                  <p className="body-2 text-white">
                    <span className="font-semibold">{file.name}</span> is too
                    large. Max file size is 50MB.
                  </p>
                ),
                className: "error-toast",
              });
              return; // Skip processing this file if it's too big
            }
            const formdata = new FormData();
            formdata.append("file", file);

            let uploadAction;
            if (file.type.startsWith("image")) {
              uploadAction = uploadImageToCloudinary;
            } else if (file.type.startsWith("video")) {
              uploadAction = uploadVideoToCloudinary;
            } else {
              uploadAction = uploadRawToCloudinary;
            }

            try {
              await uploadAction({
                formdata,
                path,
                id: userId,
              });
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            } catch (uploadError) {
              console.error("Error during upload:", uploadError);
              toast({
                description: `Failed to upload ${file.name}. Please try again.`,
                className: "error-toast",
              });
            }
          })
        );
      } catch (error) {
        console.error("Error processing files:", error);
        toast({
          description:
            "An error occurred while processing files. Please try again.",
          className: "error-toast",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [path, userId, toast]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
  });

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex items-center justify-end gap-x-3 xs:gap-x-6 lg:w-full">
      <div {...getRootProps()} className="">
        <Button
          type="button"
          className="relative w-[115px] h-[39px] xs:w-[146px] xs:h-[47px] rounded-[41px] bg-primaryOrangeLight text-white font-[600] text-[15px] leading-[20px] font-[family-name:var(--font-poppins-semibold)] hover:bg-primaryOrangeLight"
        >
          <form action="">
            <Label
              htmlFor="upload"
              className="flex justify-center items-center gap-x-[8px]"
            >
              <Image
                src={"/icons/upload.svg"}
                alt=""
                height={15}
                width={20}
                className="h-auto"
              />
              Upload
            </Label>
            <Input type="file" {...getInputProps()} />
          </form>
        </Button>
        {files.length > 0 && (
          <div className="absolute bottom-12 right-7 bg-white border flex flex-col items-start gap-y-2 w-[300px] h-auto px-3 py-5 z-[99999999] rounded-[8px]">
            <Typography variant="h2">Uploading...</Typography>
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);
              return (
                <div
                  className="flex justify-between items-center w-full"
                  key={file.name} // Using file name as key, assuming unique
                >
                  <div className="flex justify-center items-center gap-x-2 max-w-[90%]">
                    <div className="relative size-10 overflow-hidden rounded-full flex justify-center items-center shrink-0 before:absolute before:w-full before:h-full before:-top-0 before:left-0 before:border-t before:border-red-500 before:animate-spin before:rounded-full">
                      <Image
                        src={getFileIcon(extension, type)}
                        alt=""
                        height={24}
                        width={24}
                        className=" h-auto rounded-full "
                        priority={false}
                      />
                    </div>
                    <Typography variant="p" className="line-clamp-1">
                      {file.name}
                    </Typography>
                  </div>
                  <div
                    className="size-6 rounded-full flex justify-center items-center bg-gray-300 cursor-pointer"
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    <X size={14} className="text-white" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Button
        className="h-12 w-12 hidden rounded-full sm:flex justify-center items-center bg-primaryOrangeLight/10 hover:bg-primaryOrangeLight/20 p-0"
        onClick={async () => {
          const logoutUser = await logout();
          if (logoutUser?.status === 200) {
            window.location.href = "/auth/login";
          }
        }}
      >
        <Image
          src={"/icons/logout.svg"}
          alt=""
          height={24}
          width={24}
          className="h-auto"
        />
      </Button>
    </div>
  );
};

export default DashboardFileUpload;
