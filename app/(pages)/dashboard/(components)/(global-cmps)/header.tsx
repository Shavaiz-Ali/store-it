/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HeaderSearch from "./search";
import DashbaordFileUpload from "./file-upload";
import DashboardSidebarMobile from "./sidebar-mobile";
import { loggedInUser } from "@/actions/auth/me";
import { useToast } from "@/hooks/use-toast";
import { useAlertMessages } from "@/hooks/use-alerts";

const DashboardHeader = () => {
  const [sidebarMobile, setSidebarMobile] = useState(false);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [user, setUser] = useState<null | any>(null);

  const hey = useAlertMessages();

  const fetchUser = async () => {
    await loggedInUser()
      .then((result) => setUser(result?.user))
      .catch((error) => {
        console.error("Error fetching user:", error);
        throw new Error(error);
      });

    return user;
  };

  // console.log("selectd files", files);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 639) {
        setSidebarMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleUploadFiles = (files: FileList | null) => {
  //   console.log(files);
  // };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center h-[116px] w-full lg:gap-4">
        <div className="block sm:hidden">
          <Image
            src={"/icons/logo-full-brand.svg"}
            alt=""
            height={52}
            width={120}
            className="h-auto"
          />
        </div>
        <div className="hidden sm:block lg:w-auto w-full">
          <HeaderSearch />
        </div>
        <div className="flex justify-center items-center lg:gap-0 gap-4">
          <DashbaordFileUpload userId={user && user?._id} />
          <div
            className="block sm:hidden cursor-pointer"
            onClick={() => setSidebarMobile(true)}
          >
            <Image
              src={"/icons/menu.svg"}
              alt=""
              height={30}
              width={30}
              className="h-auto"
            />
          </div>
        </div>
      </header>
      {sidebarMobile && (
        <DashboardSidebarMobile
          sidebarMobile={sidebarMobile}
          setSidebarMobile={setSidebarMobile}
        />
      )}
    </>
  );
};

export default DashboardHeader;
