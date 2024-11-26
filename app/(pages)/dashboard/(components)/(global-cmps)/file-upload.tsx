/* eslint-disable @typescript-eslint/no-unused-vars */
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { uploadImageToCloudinary } from "@/actions/cloudinary/upload-image";
import { useAuthContext } from "@/context/authContext";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const DashbaordFileUpload = () => {
  const { toast } = useToast();
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const { user } = useAuthContext();
  const userId = user?._id as string;

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
          if (file.type.startsWith("image") || file.type.includes("image")) {
            alert(`reached to image upload ${file.type}`);
            formdata.append("file", file);
            return await uploadImageToCloudinary({
              formdata,
              path,
              userId: userId,
            }).then((uploadedFile) => {
              // if (uploadedFile) {
              //   setFiles((prevFiles) =>
              //     prevFiles.filter((f) => f.name !== file.name)
              //   );
              // }
              console.log(uploadedFile);
            });
          } else if (
            file.type.startsWith("video") ||
            file.type.includes("video")
          ) {
            // return uploadFile({ file, path }).then((uploadedFile) => {
            //   if (uploadedFile) {
            //     setFiles((prevFiles) =>
            //       prevFiles.filter((f) => f.name !== file.name)
            //     );
            //   }
            // });
          }
        } catch (error) {
          console.log(error);
        }
      });

      await Promise.all(uploadPromises);
    },
    [path]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-end gap-x-3 xs:gap-x-6 lg:w-full"
    >
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
          <Input {...getInputProps()} />
        </form>
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[120px]"></div> */}
      </Button>
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
