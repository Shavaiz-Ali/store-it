/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { loggedInUser } from "@/actions/auth/me";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const DashbaordFileUpload = ({ userId }: { userId: string | any }) => {
  const { toast } = useToast();
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  // let user: null | any = null;
  // const fetchUser = async () => {
  //   await loggedInUser()
  //     .then((result) => (user = result?.user))
  //     .catch((error) => {
  //       console.error("Error fetching user:", error);
  //       throw new Error(error);
  //     });

  //   return user;
  // };

  // (async () => {
  //   const user = await fetchUser();
  //   console.log("Resolved User:", user);
  // })();

  // const userId = user?._id as string;

  console.log(userId);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        console.log(file);
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );

          alert("max file size exceeded");
          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }
        const formdata = new FormData();
        try {
          if (!userId) alert("Access denied! userId is missing");
          if (file.type.startsWith("image") || file.type.includes("image")) {
            formdata.append("file", file);
            setIsUploading(true);
            return await uploadImageToCloudinary({
              formdata,
              path,
              id: userId as string,
            }).then((uploadedFile) => {
              if (uploadedFile) {
                setFiles((prevFiles) =>
                  prevFiles.filter((f) => f.name !== file.name)
                );
              }
              setIsUploading(false);
              console.log("image uploaded", uploadedFile);
            });
          } else if (
            file.type.startsWith("video") ||
            file.type.includes("video")
          ) {
            formdata.append("file", file);
            setIsUploading(true);
            return await uploadVideoToCloudinary({
              id: userId as string,
              formdata,
              path,
            }).then((uploadedFile) => {
              if (uploadedFile) {
                setFiles((prevFiles) =>
                  prevFiles.filter((f) => f.name !== file.name)
                );
              }
              setIsUploading(false);
            });
          } else {
            formdata.append("file", file);
            setIsUploading(true);
            return await uploadRawToCloudinary({
              id: userId as string,
              formdata,
              path,
            }).then((uploadedFile) => {
              if (uploadedFile) {
                setFiles((prevFiles) =>
                  prevFiles.filter((f) => f.name !== file.name)
                );
              }
              setIsUploading(false);
              console.log("document uploadded", uploadedFile);
            });
          }
        } catch (error) {
          setIsUploading(false);
          console.log(error);
        }
      });

      await Promise.all(uploadPromises);
    },
    [path, userId]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // if (isUploading) {
  //   alert("uploading...");
  // }

  return (
    <div className="flex items-center justify-end gap-x-3 xs:gap-x-6 lg:w-full">
      <div {...getRootProps()} className="">
        <Button
          type="button"
          className="relative w-[120px] h-[42px] xs:w-[146px] xs:h-[47px] rounded-[41px] bg-primaryOrangeLight text-white font-[600] text-[15px] leading-[20px] font-[family-name:var(--font-poppins-semibold)] hover:bg-primaryOrangeLight"
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
            <Input type="" {...getInputProps()} />
          </form>
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[120px]"></div> */}
        </Button>
        {files && files.length > 0 && (
          <div className="absolute bottom-12 right-7 bg-white border flex flex-col items-start gap-y-2 w-[300px] h-auto px-3 py-5 z-[99999999] rounded-[8px]">
            <Typography variant="h2">Uploading</Typography>
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);
              return (
                <div
                  className="flex justify-between items-center w-full"
                  key={Math.random()}
                >
                  <div className="flex justify-center items-center gap-x-2 max-w-[90%]">
                    <div className="relative size-10 overflow-hidden rounded-full flex justify-center items-center">
                      <Image
                        src={getFileIcon(extension, type)}
                        alt=""
                        fill
                        className=" h-auto rounded-full "
                        priority={false}
                      />
                    </div>
                    <Typography variant="p" className="line-clamp-1">
                      {file.name}
                    </Typography>
                  </div>
                  <div className="size-6 rounded-full flex justify-center items-center bg-gray-300 cursor-pointer">
                    <X size={14} className="text-white" />
                  </div>
                </div>
              );
            })}
            {/* ))} */}
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
        {/* <span>Search</span> */}
      </Button>
    </div>
  );
};

export default DashbaordFileUpload;
